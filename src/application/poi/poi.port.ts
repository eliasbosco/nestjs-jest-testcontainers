import { UpdateResult } from 'typeorm';
import { POI } from '../../domain/poi/poi.entity';
import { CreatePOIDto, UpdatePOIDto } from './poi.dto';

export interface IPOIPort {
  findAll(page: number, limit: number): Promise<{ data: POI[], total: number }>;
  findOne(id: string): Promise<POI | null>;
  create(createPOIDto: CreatePOIDto): Promise<POI>;
  update(id: string, updatePOIDto: UpdatePOIDto): Promise<Partial<POI>>;
  delete(id: string): Promise<void>;
}