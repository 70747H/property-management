import { PropertyType } from '../enum/unit-type.enum';
import { Point } from 'geojson';
import { UnitDto } from './unit.dto';

export class PropertyResponseDto {
  location: Point;
  property_type: PropertyType;
  price_per_sqm: number;
  number_of_rooms: number;
  units: UnitDto[];
}
