import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Environment } from 'testcontainers/build/types';
import { DataSource } from 'typeorm';
import { POI } from '../../domain/poi/poi.entity';
import { Country } from '../../domain/country/country.entity';
import { PublicHoliday } from '../../domain/public-holiday/public-holiday.entity';
import { FuelProduct } from '../../domain/fuel-product/fuel-product.entity';
import { Pump } from '../../domain/pump/pump.entity';
import { PumpFuelProduct } from '../../domain/pump-fuel-product/pump-fuel-product.entity';
import { User } from '../../domain/user/user.entity';

let container: StartedTestContainer;

export const datasource = {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'myapppassword',
    database: 'rydtest',
}

export async function setupPostgres() {
    const POSTGRES_USER = 'postgres';
    const POSTGRES_PASSWORD = 'myapppassword';
    const POSTGRES_DB = 'rydtest';
    const env: Environment = {
        'POSTGRES_DB': POSTGRES_DB,
        'POSTGRES_USER': POSTGRES_USER,
        'POSTGRES_PASSWORD': POSTGRES_PASSWORD,
    };
    container = await new GenericContainer('postgres:14')
        .withEnvironment(env)
        .withExposedPorts(5432)
        .start();

    // Create a new TypeORM connection
    datasource.host = container.getHost();
    datasource.port = container.getMappedPort(5432);
    const ds = new DataSource({
        type: 'postgres',
        host: datasource.host,
        port: datasource.port,
        username: datasource.username,
        password: datasource.password,
        database: datasource.database,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true, // Create schema on every application launch
        migrations: [__dirname + '/../../infrastructure/database/migrations/**/*{.ts,.js}'],
        // migrationsRun: true,
    });
    await ds.initialize();
    await ds.runMigrations();
};

export const stopTestContainer = async () => {
    if (container) {
        await container.stop();
    }
};