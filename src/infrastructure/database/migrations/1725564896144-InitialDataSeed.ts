import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class InitialDataSeed1725564896144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert seed data

        // Countries
        const countryId: string = uuidv4();
        await queryRunner.query(`
        INSERT INTO "country" (id, name, code, symbol)
        VALUES ('${countryId}', 'Germany', 'EUR', '€'),
               ('${uuidv4()}', 'USA', 'USD', '$'),
               ('${uuidv4()}', 'Brazil', 'BRL', 'R$');
        `);

        // POI
        const poiId: string =  uuidv4();
        await queryRunner.query(`
        INSERT INTO "poi" (id, name, zip, city, street, "houseNumber", status, "openingHours", "countryId")
        VALUES ('${poiId}', 'Munich Gast Station 1', '80939', 'Munich', 'Ingolstaedter Str.', '59', 'Online',
        '[{"weekDays": ["Monday","Tuesday","Wednesday"],"openTime": "8:00 am","closeTime": "5:00 pm"}, {"weekDays": ["Thursday","Friday","Saturday"],"openTime": "8:00 am","closeTime": "1:00 pm"}]',
        '${countryId}');
        `);

        // Pump
        const pumpId: string = uuidv4();
        await queryRunner.query(`
        INSERT INTO "pump" (id, name, "poiId")
        VALUES ('${pumpId}', '1', '${poiId}');
        `);

        // FuelProduct
        const fuelProductId1: string = uuidv4();
        await queryRunner.query(`
        INSERT INTO fuel_product (id, name, price, "poiId")
        VALUES ('${fuelProductId1}', 'Super E10', 1.80, '${poiId}');
        `);

        const fuelProductId2: string = uuidv4();
        await queryRunner.query(`
        INSERT INTO fuel_product (id, name, price, "poiId")
        VALUES ('${fuelProductId2}', 'Diesel', 1.60, '${poiId}');
        `);

        // PumpFuelProduct
        await queryRunner.query(`
        INSERT INTO pump_fuel_product ("fuelProductId", "pumpId", status)
        VALUES ('${fuelProductId1}', '${pumpId}', 'Online'),
               ('${fuelProductId2}', '${pumpId}', 'Online');
        `);

        // Hash the password for seed users
        const password = await bcrypt.hash('senha123456!', 10);

        // Create seed users
        await queryRunner.query(`
        INSERT INTO "user" (name, password, email, role) 
        VALUES ('Admin', '${password}', 'admin@example.com', 'Admin'), 
               ('John Doe', '${password}', 'johndoe@example.com', 'POI');
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
