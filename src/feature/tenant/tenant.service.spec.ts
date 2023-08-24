import { TestBed } from '@automock/jest';
import { TenantService } from './tenant.service';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';

describe('TenantService', () => {
  let service: TenantService;
  let tenantRepository: jest.Mocked<Repository<Tenant>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(TenantService).compile();
    service = unit;
    tenantRepository = unitRef.get(getRepositoryToken(Tenant) as string);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TenantService.create', () => {
    beforeEach(() => {
      jest.spyOn(tenantRepository, 'insert');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call the database', () => {
      service.create({} as CreateTenantDto);
      expect(tenantRepository.insert).toBeCalledTimes(1);
    });
  });

  describe('TenantService.findAll', () => {
    beforeEach(() => {
      jest.spyOn(tenantRepository, 'find');
    });

    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should call the database', () => {
      service.findAll();
      expect(tenantRepository.find).toBeCalledTimes(1);
    });
  });

  describe('TenantService.find', () => {
    beforeEach(() => {
      jest.spyOn(tenantRepository, 'findOneBy');
    });

    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should call the database', () => {
      service.findOne(1);
      expect(tenantRepository.findOneByOrFail).toBeCalledTimes(1);
    });
  });

  describe('TenantService.update', () => {
    beforeEach(() => {
      jest.spyOn(tenantRepository, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call the database', () => {
      service.update(1, {} as UpdateTenantDto);
      expect(tenantRepository.update).toBeCalledTimes(1);
    });
  });

  describe('TenantService.remove', () => {
    beforeEach(() => {
      jest.spyOn(tenantRepository, 'softRemove');
    });

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should call the database', () => {
      service.remove(1);
      expect(tenantRepository.softRemove).toBeCalledTimes(1);
    });
  });
});
