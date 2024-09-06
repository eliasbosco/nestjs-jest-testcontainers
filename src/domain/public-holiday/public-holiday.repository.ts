import { PublicHoliday } from './public-holiday.entity';

export interface IPublicHolidayRepository<PublicHoliday> {
  findById(id: string): Promise<PublicHoliday | null>;
  findAll(): Promise<PublicHoliday[]>;
  create(holiday: Partial<PublicHoliday>): Promise<PublicHoliday>;
  update(id: string, holiday: Partial<PublicHoliday>): Promise<PublicHoliday>;
  delete(id: string): Promise<void>;
}