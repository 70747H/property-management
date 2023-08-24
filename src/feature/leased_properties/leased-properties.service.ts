import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LeasedProperties } from './entities/leased-properties.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeasedPropertiesDto } from './dto/create-lease-properties.dto';
import { Landlord } from '../landlord/entities/landlord.entity';

@Injectable()
export class LeasedPropertiesService {
  constructor(
    @InjectRepository(LeasedProperties)
    private readonly leasePropertiesRepository: Repository<LeasedProperties>,
    @InjectRepository(Landlord)
    private readonly landlordRepository: Repository<Landlord>,
  ) {}

  async lease(createLeasedPropertiesDto: CreateLeasedPropertiesDto) {
    const { landlord_id, tenant_id, property_id, ...rest } =
      createLeasedPropertiesDto;
    const data = await this.landlordRepository.query(
      'SELECT * FROM landlord_properties WHERE "landlordId" = $1 AND "propertyId" = $2;',
      [landlord_id, property_id],
    );

    if (!data?.length)
      throw new BadRequestException("LandLord doesn't own this property");

    const saveLeasedPropertyObject = {
      tenant: { id: tenant_id },
      property: { id: property_id },
      ...rest,
    };
    await this.leasePropertiesRepository.insert(saveLeasedPropertyObject);
  }
}
