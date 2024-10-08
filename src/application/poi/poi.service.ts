import { Inject, Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { IPOIRepository } from '../../domain/poi/poi.repository';
import { POI } from '../../domain/poi/poi.entity';
import { IPOIPort } from './poi.port';
import { CustomExceptionFilter } from '../../shared/exceptions/custom-exception.filter';

@Injectable()
@UseFilters(CustomExceptionFilter)
export class POIService implements IPOIPort {
    constructor(
        @Inject('IPOIRepository')
        private readonly repository: IPOIRepository<POI>
    ) { }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: POI[], total: number }> {
        // Validate and adjust pagination parameters if needed
        const pageNumber = page > 0 ? page : 1;
        const limitNumber = limit > 0 ? limit : 10;

        // Call the repository method to get paginated results
        return this.repository.findAll(pageNumber, limitNumber);
    }

    async findOne(id: string): Promise<POI> {
        return await this.repository.findById(id);
    }

    async create(poi: POI): Promise<POI> {
        return await this.repository.create(poi);
    }

    async update(id: string, poi: Partial<POI>): Promise<Partial<POI>> {
        // Ensure that the ID is valid before proceeding
        const existingPOI = await this.repository.findById(id);
        if (!existingPOI) {
            throw new NotFoundException(`POI '${id}' not found`);
        }

        return this.repository.update(poi);
    }

    async delete(id: string): Promise<void> {
        // Ensure that the ID is valid before deleting
        const existingPOI = await this.repository.findById(id);
        if (!existingPOI) {
            throw new NotFoundException(`POI '${id}' not found`);
        }

        return this.repository.delete(existingPOI);
    }
}