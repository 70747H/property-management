import { TestBed } from '@automock/jest';
import { UnitService } from './unit.service';
import { Unit } from './entities/unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { CreateUnitDto } from './dto/create-unit.dto';

describe('UnitService', () => {
  let service: UnitService;
  let unitRepository: jest.Mocked<Repository<Unit>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UnitService).compile();
    service = unit;
    unitRepository = unitRef.get(getRepositoryToken(Unit) as string);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UnitService.create', () => {
    beforeEach(() => {
      jest.spyOn(unitRepository, 'insert');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call the database', () => {
      service.create({} as CreateUnitDto);
      expect(unitRepository.insert).toBeCalledTimes(1);
    });
  });

  describe('UnitService.findAll', () => {
    beforeEach(() => {
      jest.spyOn(unitRepository, 'find');
    });

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should call the database', () => {
      service.findAll();
      expect(unitRepository.find).toBeCalledTimes(1);
    });
  });

  describe('UnitService.find', () => {
    beforeEach(() => {
      jest.spyOn(unitRepository, 'findOneBy');
    });

    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should call the database', () => {
      service.findOne(1);
      expect(unitRepository.findOneByOrFail).toBeCalledTimes(1);
    });
  });

  describe('UnitService.update', () => {
    beforeEach(() => {
      jest.spyOn(unitRepository, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call the database', () => {
      service.update(1, {} as UpdateUnitDto);
      expect(unitRepository.update).toBeCalledTimes(1);
    });
  });

  describe('UnitService.remove', () => {
    beforeEach(() => {
      jest.spyOn(unitRepository, 'softRemove');
    });

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should call the database', () => {
      service.remove(1);
      expect(unitRepository.softRemove).toBeCalledTimes(1);
    });
  });
});
