import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { LeasedPropertiesService } from '../leased_properties/leased-properties.service';
import { LeasedProperties } from '../leased_properties/entities/leased-properties.entity';
import { Landlord } from '../landlord/entities/landlord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, LeasedProperties, Landlord])],
  controllers: [TenantController],
  providers: [TenantService, LeasedPropertiesService],
})
export class TenantModule {}
