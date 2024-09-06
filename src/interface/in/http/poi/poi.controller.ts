import { Controller, Get, Post, Put, Delete, Param, Body, Query, Inject, UseGuards, UseFilters } from '@nestjs/common';
import { IPOIPort } from '../../../../application/poi/poi.port';
import { POI } from '../../../../domain/poi/poi.entity';
import { CreatePOIDto, UpdatePOIDto } from '../../../../application/poi/poi.dto';
import { JwtAuthGuard } from '../../../../infrastructure/security/http/guards/jwt-auth.guard';
import { CustomExceptionFilter } from '../../../../infrastructure/config/custom-exception.filter';

@Controller('pois')
@UseGuards(JwtAuthGuard)
@UseFilters(CustomExceptionFilter)
export class POIController {
    constructor(
        @Inject('IPOIPort') private readonly poiService: IPOIPort
    ) { }

    @Get()
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<{ data: POI[], total: number }> {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.poiService.findAll(pageNumber, limitNumber);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.poiService.findOne(id);
    }

    @Post()
    create(@Body() poi: CreatePOIDto) {
        return this.poiService.create(poi);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() poi: UpdatePOIDto) {
        return this.poiService.update(id, poi);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.poiService.delete(id);
    }
}