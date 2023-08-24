import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTenantDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  contact_details?: string;
}
