import { UnitType } from '../src/feature/property/enum/unit-type.enum';
import { Unit } from '../src/feature/unit/entities/unit.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUnit1692834316230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save([
      queryRunner.manager.create<Unit>(Unit, {
        id: 1,
        unit_type: UnitType.FLAT,
        property: { id: 1 },
      }),
      queryRunner.manager.create<Unit>(Unit, {
        id: 2,
        unit_type: UnitType.STUDIO,
        property: { id: 2 },
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE table unit RESTART IDENTITY CASCADE;`);
  }
}
