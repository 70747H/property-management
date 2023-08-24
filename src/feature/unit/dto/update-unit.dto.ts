import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UnitType } from '../../property/enum/unit-type.enum';

export class UpdateUnitDto {
  @IsNotEmpty()
  @IsEnum(UnitType)
  @IsOptional()
  unit_type?: UnitType;
}
