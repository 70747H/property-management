import { Module } from '@nestjs/common';
import { LeasedPropertiesService } from './leased-properties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landlord } from '../landlord/entities/landlord.entity';
import { LeasedProperties } from './entities/leased-properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Landlord, LeasedProperties])],
  providers: [LeasedPropertiesService],
  exports: [LeasedPropertiesService],
})
export class LeasedPropertiesModule {}
