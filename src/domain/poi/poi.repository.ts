import { POI } from "./poi.entity";

export interface IPOIRepository<POI> {
  findById(id: string): Promise<POI>;
  findAll(page: number, limit: number): Promise<{ data: POI[], total: number }>;
  create(poi: POI): Promise<POI>;
  update(poi: Partial<POI>): Promise<Partial<POI>>;
  delete(poi: POI): Promise<void>;
}