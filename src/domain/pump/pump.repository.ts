import { Pump } from "./pump.entity";

export interface PumpRepository<Pump> {
  findById(id: string): Promise<Pump>;
  findAll(): Promise<Pump[]>;
  create(pump: Partial<Pump>): Promise<Pump>;
  update(id: string, pump: Partial<Pump>): Promise<Pump>;
  delete(id: string): Promise<void>;
}