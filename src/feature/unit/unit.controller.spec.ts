import { TestBed } from '@automock/jest';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

describe('UnitController', () => {
  let controller: UnitController;
  let unitService: jest.Mocked<UnitService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UnitController).compile();
    controller = unit;
    unitService = unitRef.get(UnitService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('UnitController.findAll', () => {
    beforeEach(() => {
      jest.spyOn(unitService, 'findAll');
    });

    it('should be defined', () => {
      expect(unitService.findAll).toBeDefined();
    });

    it('should call unitService.findAll', () => {
      controller.findAll();
      expect(unitService.findAll).toBeCalledTimes(1);
    });
  });

  describe('UnitController.find', () => {
    beforeEach(() => {
      jest.spyOn(unitService, 'findOne');
    });

    it('should be defined', () => {
      expect(unitService.findOne).toBeDefined();
    });

    it('should call unitService.get', () => {
      controller.findOne('1');
      expect(unitService.findOne).toBeCalledTimes(1);
    });
  });

  describe('UnitController.create', () => {
    beforeEach(() => {
      jest.spyOn(unitService, 'create');
    });

    it('should be defined', () => {
      expect(unitService.create).toBeDefined();
    });

    it('should call unitService.create', () => {
      controller.create({} as CreateUnitDto);
      expect(unitService.create).toBeCalledTimes(1);
    });
  });

  describe('UnitController.update', () => {
    beforeEach(() => {
      jest.spyOn(unitService, 'update');
    });

    it('should be defined', () => {
      expect(unitService.update).toBeDefined();
    });

    it('should call unitService.update', () => {
      controller.update('1', {} as UpdateUnitDto);
      expect(unitService.update).toBeCalledTimes(1);
    });
  });

  describe('UnitController.delete', () => {
    beforeEach(() => {
      jest.spyOn(unitService, 'remove');
    });

    it('should be defined', () => {
      expect(unitService.remove).toBeDefined();
    });

    it('should call unitService.delete', () => {
      controller.remove('1');
      expect(unitService.remove).toBeCalledTimes(1);
    });
  });
});
