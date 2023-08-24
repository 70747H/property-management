import { TestBed } from '@automock/jest';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

describe('TenantController', () => {
  let controller: TenantController;
  let tenantService: jest.Mocked<TenantService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(TenantController).compile();
    controller = unit;
    tenantService = unitRef.get(TenantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('TenantController.findAll', () => {
    beforeEach(() => {
      jest.spyOn(tenantService, 'findAll');
    });

    it('should be defined', () => {
      expect(tenantService.findAll).toBeDefined();
    });

    it('should call tenantService.findAll', () => {
      controller.findAll();
      expect(tenantService.findAll).toBeCalledTimes(1);
    });
  });

  describe('TenantController.find', () => {
    beforeEach(() => {
      jest.spyOn(tenantService, 'findOne');
    });

    it('should be defined', () => {
      expect(tenantService.findOne).toBeDefined();
    });

    it('should call tenantService.get', () => {
      controller.findOne('1');
      expect(tenantService.findOne).toBeCalledTimes(1);
    });
  });

  describe('TenantController.create', () => {
    beforeEach(() => {
      jest.spyOn(tenantService, 'create');
    });

    it('should be defined', () => {
      expect(tenantService.create).toBeDefined();
    });

    it('should call tenantService.create', () => {
      controller.create({} as CreateTenantDto);
      expect(tenantService.create).toBeCalledTimes(1);
    });
  });

  describe('TenantController.update', () => {
    beforeEach(() => {
      jest.spyOn(tenantService, 'update');
    });

    it('should be defined', () => {
      expect(tenantService.update).toBeDefined();
    });

    it('should call tenantService.update', () => {
      controller.update('1', {} as UpdateTenantDto);
      expect(tenantService.update).toBeCalledTimes(1);
    });
  });

  describe('TenantController.delete', () => {
    beforeEach(() => {
      jest.spyOn(tenantService, 'remove');
    });

    it('should be defined', () => {
      expect(tenantService.remove).toBeDefined();
    });

    it('should call tenantService.delete', () => {
      controller.remove('1');
      expect(tenantService.remove).toBeCalledTimes(1);
    });
  });
});
