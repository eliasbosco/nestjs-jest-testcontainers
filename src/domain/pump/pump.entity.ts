import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { POI } from '../poi/poi.entity';
import { v4 as uuidv4 } from 'uuid';
import { JoinTable } from 'typeorm';
import { PumpFuelProduct } from '../pump-fuel-product/pump-fuel-product.entity';

@Entity()
export class Pump {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    name: string;

    @ManyToOne(() => POI, (poi) => poi.pumps, { onDelete: 'CASCADE' })
    @JoinTable()
    poi: POI;

    @OneToMany(() => PumpFuelProduct, (pumpFuelProduct) => pumpFuelProduct.pump, { onDelete: 'CASCADE' })
    pumpFuelProduct: PumpFuelProduct;
}