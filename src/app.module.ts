import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from '../orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/confguration';
import { validate } from './config/env.validation';
import { PropertyModule } from './feature/property/property.module';
import { TenantModule } from './feature/tenant/tenant.module';
import { UnitModule } from './feature/unit/unit.module';
import { LandlordModule } from './feature/landlord/landlord.module';
import { LeasedPropertiesModule } from './feature/leased_properties/leased_properties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...typeOrmModuleOptions,
      }),
    }),
    PropertyModule,
    TenantModule,
    UnitModule,
    LandlordModule,
    LeasedPropertiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
