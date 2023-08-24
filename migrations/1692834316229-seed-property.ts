import { Point } from 'geojson';
import { Property } from '../src/feature/property/entities/property.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { PropertyType } from '../src/feature/property/enum/unit-type.enum';

export class SeedProperty1692834316229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save([
      queryRunner.manager.create<Property>(Property, {
        id: 1,
        name: 'property A',
        location: {
          type: 'Point',
          coordinates: [31.354033, 27.227292],
        } as Point,
        property_type: PropertyType.VILLA,
        price_per_sqm: 1000,
        number_of_rooms: 10,
      }),
      queryRunner.manager.create<Property>(Property, {
        id: 2,
        name: 'property B',
        location: {
          type: 'Point',
          coordinates: [31.354033, 27.227292],
        } as Point,
        property_type: PropertyType.STUDIO,
        price_per_sqm: 100,
        number_of_rooms: 1,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `TRUNCATE table property RESTART IDENTITY CASCADE;`,
    );
  }
}
