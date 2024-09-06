import { IsNotEmpty, IsString, IsUUID, IsBoolean, ValidateNested, IsOptional, IsIn, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Status, POIWeekDays, WeekDays } from '../../domain/poi/poi.entity';
import { Country } from '../../domain/country/country.entity';


class AddressDto {
    @IsNotEmpty()
    @IsString()
    country: Country;

    @IsNotEmpty()
    @IsString()
    zip: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    houseNumber: string;
}

export class OpeningHoursDto {
    @IsArray() // Validate that it's an array
    @ArrayNotEmpty() // Ensure the array is not empty
    @IsEnum(WeekDays, { each: true }) // Validate that each element in the array is a valid enum value
    weekDays: WeekDays[];

    @IsString() // Ensure that the field is a string
    @IsNotEmpty() // Ensure that the field is not empty
    openTime: string;

    @IsString() // Ensure that the field is a string
    @IsNotEmpty() // Ensure that the field is not empty
    closeTime: string;
}

export class CreatePOIDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsNotEmpty()
    @IsString()
    @IsIn([Status])
    status: Status;

    @IsOptional()
    @IsUUID()
    poiId: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => OpeningHoursDto)
    openingHours: OpeningHoursDto[];

    @IsOptional()
    @IsBoolean()
    workOnPublicHolidays?: boolean;
}

export class UpdatePOIDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => AddressDto)
    address?: AddressDto;

    @IsOptional()
    @IsArray()
    openingHours: POIWeekDays[];

    @IsOptional()
    @IsBoolean()
    workOnPublicHolidays?: boolean;
}