import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pump } from '../pump/pump.entity';
import { FuelProduct } from '../fuel-product/fuel-product.entity';

export enum Status {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}

@Entity()
export class PumpFuelProduct {
  @PrimaryGeneratedColumn('uuid')
  fuelProductId: string;

  @PrimaryGeneratedColumn('uuid')
  pumpId: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @ManyToOne(() => FuelProduct, (fuelProduct) => fuelProduct.pumpFuelProduct, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fuelProductId'})
  fuelProduct: FuelProduct;

  @ManyToOne(() => Pump, (pump) => pump.pumpFuelProduct, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pumpId'})
  pump: Pump;
}