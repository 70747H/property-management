import { TestBed } from '@automock/jest';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

describe('PropertyController', () => {
  let controller: PropertyController;
  let propertyService: jest.Mocked<PropertyService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PropertyController).compile();
    controller = unit;
    propertyService = unitRef.get(PropertyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('PropertyController.findAll', () => {
    beforeEach(() => {
      jest.spyOn(propertyService, 'findAll');
    });

    it('should be defined', () => {
      expect(propertyService.findAll).toBeDefined();
    });

    it('should call propertyService.findAll', () => {
      controller.findAll();
      expect(propertyService.findAll).toBeCalledTimes(1);
    });
  });

  describe('PropertyController.find', () => {
    beforeEach(() => {
      jest.spyOn(propertyService, 'findOne');
    });

    it('should be defined', () => {
      expect(propertyService.findOne).toBeDefined();
    });

    it('should call propertyService.get', () => {
      controller.findOne('1');
      expect(propertyService.findOne).toBeCalledTimes(1);
    });
  });

  describe('PropertyController.create', () => {
    beforeEach(() => {
      jest.spyOn(propertyService, 'create');
    });

    it('should be defined', () => {
      expect(propertyService.create).toBeDefined();
    });

    it('should call propertyService.create', () => {
      controller.create({} as CreatePropertyDto);
      expect(propertyService.create).toBeCalledTimes(1);
    });
  });

  describe('PropertyController.update', () => {
    beforeEach(() => {
      jest.spyOn(propertyService, 'update');
    });

    it('should be defined', () => {
      expect(propertyService.update).toBeDefined();
    });

    it('should call propertyService.update', () => {
      controller.update('1', {} as UpdatePropertyDto);
      expect(propertyService.update).toBeCalledTimes(1);
    });
  });

  describe('PropertyController.delete', () => {
    beforeEach(() => {
      jest.spyOn(propertyService, 'remove');
    });

    it('should be defined', () => {
      expect(propertyService.remove).toBeDefined();
    });

    it('should call propertyService.delete', () => {
      controller.remove('1');
      expect(propertyService.remove).toBeCalledTimes(1);
    });
  });
});
