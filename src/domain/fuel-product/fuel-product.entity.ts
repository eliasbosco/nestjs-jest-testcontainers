import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { POI } from '../poi/poi.entity';
import { PumpFuelProduct } from '../pump-fuel-product/pump-fuel-product.entity';

@Entity()
export class FuelProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => POI, (poi) => poi.fuelProducts, { onDelete: 'CASCADE' })
  @JoinTable()
  poi: POI;

  @OneToMany(() => PumpFuelProduct, (pumpFuelProduct) => pumpFuelProduct.fuelProduct, { onDelete: 'CASCADE' })
  pumpFuelProduct: PumpFuelProduct;
}