import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PropertyType } from '../enum/unit-type.enum';
import { Transform, Type } from 'class-transformer';
import { Point } from 'geojson';
import { PointDto } from './point.dto';
import { UnitDto } from './unit.dto';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @IsLongitude()
  long: number;

  @IsNotEmptyObject()
  received_location: PointDto;

  @ApiHideProperty()
  @Transform((params) => (params.value = undefined))
  location?: Point;

  @IsNotEmpty()
  @IsEnum(PropertyType)
  property_type: PropertyType;

  @IsNotEmpty()
  @IsNumber()
  price_per_sqm: number;

  @IsNotEmpty()
  @IsNumber()
  number_of_rooms: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UnitDto)
  units?: UnitDto[];
}
