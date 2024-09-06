import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository, UpdateResult } from 'typeorm';
import { POI } from '../../../domain/poi/poi.entity';
import { IPOIRepository } from '../../../domain/poi/poi.repository';

@Injectable()
export class POIRepositoryImpl implements IPOIRepository<POI> {
    constructor(
        @InjectRepository(POI)
        private readonly poiRepository: Repository<POI>,
        private readonly connection: Connection
    ) { }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: POI[], total: number }> {
        const [result, total] = await this.poiRepository
            .createQueryBuilder('poi')
            .innerJoinAndSelect('poi.country', 'country')
            .leftJoinAndSelect('poi.pumps', 'pump')
            .leftJoinAndSelect('pump.pumpFuelProduct', 'pumpFuelProduct')
            .leftJoinAndSelect('pumpFuelProduct.fuelProduct', 'fuelProductForPump')
            .leftJoinAndSelect('poi.fuelProducts', 'fuelProductForPOI')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            data: result,
            total,
        };
    }

    async findById(id: string): Promise<POI> {
        return await this.poiRepository.findOne(
            { where: { id }, relations: ['pumps'] },
        );
    }

    async create(poi: Partial<POI>): Promise<POI> {
        // Start transaction
        return await this.poiRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            return await this.poiRepository.save(poi);
        });
    }

    async update(poi: Partial<POI>): Promise<Partial<POI>> {
        return await this.poiRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            // Start transaction
            return await transactionalEntityManager.save(poi);
        });
    }

    async delete(poi: POI): Promise<void> {
        // Start transaction
        return await this.poiRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            await this.poiRepository.remove(poi);
        });
    }
}