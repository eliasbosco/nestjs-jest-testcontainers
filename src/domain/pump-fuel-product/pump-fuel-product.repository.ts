import { PumpFuelProduct } from "./pump-fuel-product.entity";

export interface PumpFuelProductRepository<PumpFuelProduct> {
  findByIds(fuelProductId: string, pumpId: string): Promise<PumpFuelProduct>;
}