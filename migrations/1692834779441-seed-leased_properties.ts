import { LeasedProperties } from '../src/feature/tenant/entities/leased-properties.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLeasedProperties1692834779441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save([
      queryRunner.manager.create<LeasedProperties>(LeasedProperties, {
        id: 1,
        start_date: '2023-07-24 16:44:53.614697+3',
        end_date: '2023-08-24 16:44:53.614697+3',
        tenant: { id: 1 },
        property: { id: 1 },
      }),
      queryRunner.manager.create<LeasedProperties>(LeasedProperties, {
        id: 2,
        start_date: '2023-08-24 16:44:53.614697+3',
        end_date: '2023-09-24 16:44:53.614697+3',
        tenant: { id: 2 },
        property: { id: 2 },
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `TRUNCATE table leased_properties RESTART IDENTITY CASCADE;`,
    );
  }
}
