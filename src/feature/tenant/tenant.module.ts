import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { LeasedPropertiesService } from './leased-properties.service';
import { LeasedProperties } from './entities/leased-properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, LeasedProperties])],
  controllers: [TenantController],
  providers: [TenantService, LeasedPropertiesService],
})
export class TenantModule {}
