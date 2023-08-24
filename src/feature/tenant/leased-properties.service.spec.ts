import { TestBed } from '@automock/jest';
import { LeasedPropertiesService } from './leased-properties.service';

describe('Service', () => {
  let service: LeasedPropertiesService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(LeasedPropertiesService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
