import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLeasedPropertiesDto {
  @IsNotEmpty()
  @IsNumber()
  tenant_id: number;

  @IsNotEmpty()
  @IsNumber()
  property_id: number;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsNotEmpty()
  @IsDateString()
  end_date: string;
}
