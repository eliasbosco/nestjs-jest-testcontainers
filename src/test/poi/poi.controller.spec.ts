import { Test, TestingModule } from '@nestjs/testing';
import { POIService } from '../../application/poi/poi.service';
import { POIController } from '../../interface/in/http/poi/poi.controller';
import { POIRepositoryImpl } from '../../infrastructure/database/poi/poi.repository.impl';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { POI } from '../../domain/poi/poi.entity';
import { Country } from '../../domain/country/country.entity';
import { PublicHoliday } from '../../domain/public-holiday/public-holiday.entity';
import { FuelProduct } from '../../domain/fuel-product/fuel-product.entity';
import { Pump } from '../../domain/pump/pump.entity';
import { PumpFuelProduct } from '../../domain/pump-fuel-product/pump-fuel-product.entity';
import { User } from '../../domain/user/user.entity';
import { setupPostgres, stopTestContainer, datasource } from '../pg-testcontainer/setupPgTestContainer';

describe('POIController', () => {
    let poiController: POIController;
    let pg: any;

    beforeAll(async () => {
        await setupPostgres();
    }, 60000);

    // Creating test database container
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: datasource.host,
                    port: datasource.port,
                    username: datasource.username,
                    password: datasource.password,
                    database: datasource.database,
                    entities: [POI, Country, Pump, FuelProduct, PumpFuelProduct, PublicHoliday, User],
                }),
                TypeOrmModule.forFeature([POI]),
            ], // Ensure TypeOrmModule is configured to use the POI entity
            controllers: [POIController], // Attach the controller
            providers: [
                {
                    provide: 'IPOIPort', // Bind IPOIPort interface
                    useClass: POIService, // Use POIService as the implementation
                },
                {
                    provide: 'IPOIRepository',
                    useClass: POIRepositoryImpl,
                },
            ],
        }).compile();

        poiController = app.get<POIController>(POIController);
    });

    afterAll(async () => {
        await stopTestContainer();
    });

    describe('GET /pois', () => {
        it('should return a list of registered POIs', async () => {
            const result = await poiController.findAll();
            // Testing POI
            const poi = result.data?.[0];
            expect(poi).toBeTruthy();
            expect(poi.name).toEqual('Munich Gast Station 1');
            expect(poi.city).toEqual('Munich');
            expect(poi.zip).toEqual('80939');
            expect(poi.status).toEqual('Online');
            expect(poi.openingHours).toBeTruthy();
            expect(poi.workOnPublicHolidays).toBeFalsy();
            expect(poi.fuelProducts).toBeTruthy();
            expect(poi.pumps).toBeTruthy();
            
            // Testing Pump
            const pump = poi.pumps?.[0];
            expect(pump).toBeTruthy();
            expect(pump.name).toEqual('1');
            expect(pump.pumpFuelProduct).toBeTruthy();
            

            // Testing POI FuelProduct
            expect(poi.fuelProducts).toHaveLength(2);
            const fuelProduct = poi.fuelProducts?.[0];
            expect(fuelProduct).toBeTruthy();
            expect(fuelProduct.name).toEqual('Super E10');
            expect(fuelProduct.price).toEqual('1.80');

        });
    });
});
