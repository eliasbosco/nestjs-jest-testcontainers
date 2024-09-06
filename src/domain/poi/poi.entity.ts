import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pump } from '../pump/pump.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.entity';
import { FuelProduct } from '../fuel-product/fuel-product.entity';
import { Country } from '../country/country.entity';

export enum Status {
    ONLINE = 'Online',
    OFFLINE = 'Offline',
}

export enum WeekDays {
    SUNDAY = 'Sunday',
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
}

export type POIWeekDays = {
    weekDays: WeekDays[],
    openTime: string,
    closeTime: string
}

@Entity()
export class POI {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    name: string;

    @Column()
    zip: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    houseNumber: string;

    @Column({ type: 'enum', enum: Status })
    status: [Status];

    @Column({ type: 'jsonb', nullable: true })
    openingHours: POIWeekDays[];

    @Column('boolean', { default: false })
    workOnPublicHolidays: boolean;

    @ManyToOne(() => Country, (country) => country.poi, { onDelete: 'CASCADE' })
    @JoinTable()
    country: Country;

    @OneToMany(() => Pump, (pump) => pump.poi)
    pumps: Pump[];

    @OneToMany(() => FuelProduct, (fuelProduct) => fuelProduct.poi)
    fuelProducts: FuelProduct[];

    @OneToMany(() => User, (user) => user.poi)
    users: User[];
}