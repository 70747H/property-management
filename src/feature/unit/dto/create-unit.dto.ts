import { IsEnum, IsNotEmpty } from 'class-validator';
import { UnitType } from '../../property/enum/unit-type.enum';

export class CreateUnitDto {
  @IsNotEmpty()
  @IsEnum(UnitType)
  unit_type: UnitType;
}
