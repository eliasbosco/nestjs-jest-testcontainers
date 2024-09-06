import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { POI } from '../poi/poi.entity';
import { PublicHoliday } from '../public-holiday/public-holiday.entity';

export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  BRL = 'BRL',
}

export enum CurrencySymbol {
  USD = '$',
  EUR = '€',
  GBP = '£',
  BRL = 'R$'
}

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column({ type: 'enum', enum: CurrencyCode })
  code: [CurrencyCode];

  @Column({ type: 'enum', enum: CurrencySymbol })
  symbol: [CurrencySymbol];

  @OneToMany(() => POI, (poi) => poi.country)
  poi: POI;

  @OneToMany(() => PublicHoliday, (publicHoliday) => publicHoliday.country)
  publicHoliday: PublicHoliday;
}