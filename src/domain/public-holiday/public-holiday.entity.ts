import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Country } from '../country/country.entity';

@Entity()
export class PublicHoliday {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    holidayName: string;

    @Column('date')
    date: string;

    @ManyToOne(() => Country, (country) => country.publicHoliday, { onDelete: 'CASCADE' })
    @JoinTable()
    country: Country;
}