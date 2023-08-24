import { IsEnum, IsNotEmpty } from 'class-validator';
import { UnitType } from '../enum/unit-type.enum';

export class UnitDto {
  @IsNotEmpty()
  @IsEnum(UnitType)
  unit_type: UnitType;
}
