import { POI } from '../../domain/poi/poi.entity';

export interface IPOIPort {
    findAll(page: number, limit: number): Promise<{ data: POI[], total: number }>;
    findOne(id: string): Promise<POI | null>;
    create(poi: POI): Promise<POI>;
    update(id: string, poi: Partial<POI>): Promise<Partial<POI>>;
    delete(id: string): Promise<void>;
}