import { Tenant } from '../src/feature/tenant/entities/tenant.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTenant1692834776835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save([
      queryRunner.manager.create<Tenant>(Tenant, {
        id: 1,
        name: 'Ali',
        contact_details: '+9565544512',
      }),
      queryRunner.manager.create<Tenant>(Tenant, {
        id: 2,
        name: 'Alan',
        contact_details: '+9575544513',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE table tenant RESTART IDENTITY CASCADE;`);
  }
}
