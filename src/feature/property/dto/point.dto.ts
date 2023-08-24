import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class PointDto {
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @IsLongitude()
  long: number;
}
