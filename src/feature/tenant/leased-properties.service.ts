import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LeasedProperties } from './entities/leased-properties.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeasedPropertiesDto } from './dto/create-lease-properties.dto';

@Injectable()
export class LeasedPropertiesService {
  constructor(
    @InjectRepository(LeasedProperties)
    private readonly leasePropertiesRepository: Repository<LeasedProperties>,
  ) {}

  async lease(createLeasedPropertiesDto: CreateLeasedPropertiesDto) {
    const { tenant_id, property_id, ...rest } = createLeasedPropertiesDto;
    const saveLeasedPropertyObject = {
      tenant: { id: tenant_id },
      property: { id: property_id },
      ...rest,
    };
    await this.leasePropertiesRepository.insert(saveLeasedPropertyObject);
  }
}
