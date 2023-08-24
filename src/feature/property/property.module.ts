import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Unit } from '../unit/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Unit])],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
