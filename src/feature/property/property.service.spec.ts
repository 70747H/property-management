import { TestBed } from '@automock/jest';
import { PropertyService } from './property.service';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Unit } from '../unit/entities/unit.entity';
import { UpdatePropertyDto } from './dto/update-property.dto';

describe('PropertyService', () => {
  let service: PropertyService;
  let propertyRepository: Repository<Property>;
  let unitRepository: jest.Mocked<Repository<Unit>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PropertyService).compile();
    service = unit;
    propertyRepository = unitRef.get(getRepositoryToken(Property) as string);
    unitRepository = unitRef.get(getRepositoryToken(Unit) as string);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('PropertyService.findAll', () => {
    beforeEach(() => {
      jest.spyOn(propertyRepository, 'find');
    });

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should call the database', () => {
      service.findAll();
      expect(propertyRepository.find).toBeCalledTimes(1);
    });
  });

  describe('PropertyService.find', () => {
    beforeEach(() => {
      jest.spyOn(propertyRepository, 'findOneBy');
    });

    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should call the database', () => {
      service.findOne(1);
      expect(propertyRepository.findOneBy).toBeCalledTimes(1);
    });
  });

  describe('PropertyService.update', () => {
    beforeEach(() => {
      jest.spyOn(propertyRepository, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call the database', () => {
      service.update(1, {} as UpdatePropertyDto);
      expect(propertyRepository.update).toBeCalledTimes(1);
    });
  });

  describe('PropertyService.remove', () => {
    beforeEach(() => {
      jest.spyOn(propertyRepository, 'softRemove');
    });

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should call the database', () => {
      service.remove(1);
      expect(propertyRepository.softRemove).toBeCalledTimes(1);
    });
  });
});
