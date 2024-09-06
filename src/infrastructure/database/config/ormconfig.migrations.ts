import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env file

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'ryd',
    entities: [__dirname + '/../../../**/*.entity{.ts,.js}'], // Load all entities
    synchronize: (process.env.NODE_ENV === 'development'), // Turn off for production, true for development (automatic schema sync)
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    migrationsRun: (process.env.NODE_ENV === 'development'), // Automatically run migrations on startup (optional)
    logging: (process.env.NODE_ENV === 'development'), // Enable logging (optional, useful for debugging)
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10'),
});