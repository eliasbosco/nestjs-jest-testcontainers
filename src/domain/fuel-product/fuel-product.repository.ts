import { FuelProduct } from "./fuel-product.entity";

export interface FuelProductRepository<FuelProduct> {
  findById(id: string): Promise<FuelProduct>;
  findAll(): Promise<FuelProduct[]>;
  create(fuelProduct: Partial<FuelProduct>): Promise<FuelProduct>;
  update(id: string, fuelProduct: Partial<FuelProduct>): Promise<FuelProduct>;
  delete(id: string): Promise<void>;
}