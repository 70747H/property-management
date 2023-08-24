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
import { PointDto } from './point.dto';
import { UnitDto } from './unit.dto';
import { Point } from 'geojson';
import { ApiHideProperty } from '@nestjs/swagger';

export class UpdatePropertyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsLatitude()
  lat?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsLongitude()
  long?: number;

  @IsOptional()
  @IsNotEmptyObject()
  received_location?: PointDto;

  @ApiHideProperty()
  @Transform((params) => (params.value = undefined))
  location?: Point;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(PropertyType)
  property_type?: PropertyType;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price_per_sqm?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  number_of_rooms?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UnitDto)
  units?: UnitDto[];
}
