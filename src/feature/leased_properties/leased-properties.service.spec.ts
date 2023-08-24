import { TestBed } from '@automock/jest';
import { LeasedPropertiesService } from './leased-properties.service';
import { Repository } from 'typeorm';
import { Landlord } from '../landlord/entities/landlord.entity';
import { LeasedProperties } from './entities/leased-properties.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLeasedPropertiesDto } from './dto/create-lease-properties.dto';
import { BadRequestException, Logger } from '@nestjs/common';

const logger = new Logger();

describe('LeasedPropertiesService', () => {
  let service: LeasedPropertiesService;
  let landlordRepository: jest.Mocked<Repository<Landlord>>;
  let leasePropertiesRepository: jest.Mocked<Repository<LeasedProperties>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(LeasedPropertiesService).compile();
    service = unit;
    landlordRepository = unitRef.get(getRepositoryToken(Landlord) as string);
    leasePropertiesRepository = unitRef.get(
      getRepositoryToken(LeasedProperties) as string,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('LeasedPropertiesService.lease', () => {
    beforeEach(() => {
      jest.spyOn(landlordRepository, 'query');
      jest.spyOn(leasePropertiesRepository, 'insert');
    });

    it('should be defined', () => {
      expect(service.lease).toBeDefined();
    });

    it('should insert a lease record', async () => {
      landlordRepository.query.mockResolvedValueOnce([
        { landlordId: 1, propertyId: 1 },
      ]);
      await service.lease({} as CreateLeasedPropertiesDto);
      expect(landlordRepository.query).toBeCalledTimes(1);
      expect(leasePropertiesRepository.insert).toBeCalledTimes(1);
    });

    it('should throw BadRequestException', async () => {
      try {
        await service.lease({} as CreateLeasedPropertiesDto);
        expect(landlordRepository.query).toBeCalledTimes(1);
      } catch (error) {
        logger.log('EEE: ', error);
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual(`LandLord doesn't own this property`);
      }
    });
  });
});
