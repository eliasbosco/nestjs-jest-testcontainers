import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POIService } from '../../application/poi/poi.service';
import { POIController } from '../../interface/in/http/poi/poi.controller';
import { POI } from '../../domain/poi/poi.entity';
import { POIRepositoryImpl } from '../../infrastructure/database/poi/poi.repository.impl';

@Module({
    imports: [TypeOrmModule.forFeature([POI])], // Ensure TypeOrmModule is configured to use the POI entity
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
    exports: ['IPOIPort'], // Export IPOIPort for use in other modules if needed
})
export class POIModule { }