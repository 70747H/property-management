import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Unit } from '../unit/entities/unit.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}
  async create(createPropertyDto: CreatePropertyDto) {
    const {
      received_location: { long, lat },
      ...rest
    } = createPropertyDto;
    const pointObject: Point = {
      type: 'Point',
      coordinates: [long, lat],
    };
    createPropertyDto = { ...rest, location: pointObject } as CreatePropertyDto;
    const createdProperty = await this.propertyRepository.save(
      createPropertyDto,
    );
    const unitsQueries = [];
    if (createPropertyDto?.units?.length) {
      createPropertyDto.units.forEach((unit) => {
        unitsQueries.push(
          this.unitRepository.insert({
            ...unit,
            property: { id: createdProperty.id },
          }),
        );
      });
    }
    await Promise.all(unitsQueries);
  }

  findAll() {
    return this.propertyRepository.find({ relations: ['units'] });
  }

  findOne(id: number) {
    return this.propertyRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<void> {
    if (updatePropertyDto.received_location) {
      const {
        received_location: { long, lat },
        ...rest
      } = updatePropertyDto;
      const pointObject: Point = {
        type: 'Point',
        coordinates: [long, lat],
      };
      updatePropertyDto = { ...rest, location: pointObject };
    }
    await this.propertyRepository.update({ id }, updatePropertyDto);
  }

  remove(id: number) {
    return this.propertyRepository.softRemove({ id });
  }
}
