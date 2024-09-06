import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { POI } from '../poi/poi.entity';

export enum Role {
  ADMIN = 'Admin',
  POI = 'POI',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @ManyToOne(() => POI, (poi) => poi.users)
  @JoinTable()
  poi: POI;

}