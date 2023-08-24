import { Landlord } from '../src/feature/landlord/entities/landlord.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLandlordProperties1692864803213 implements MigrationInterface {
  name = 'SeedLandlordProperties1692864803213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save([
      queryRunner.manager.create<Landlord>(Landlord, {
        id: 1,
        name: 'Hanz',
        contact_details: '+9565544512',
        properties: [{ id: 1 }],
      }),
      queryRunner.manager.create<Landlord>(Landlord, {
        id: 2,
        name: 'Solo',
        contact_details: '+9575544513',
        properties: [{ id: 2 }],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `TRUNCATE table landlord RESTART IDENTITY CASCADE;`,
    );
    await queryRunner.query(
      `TRUNCATE table landlord_properties RESTART IDENTITY CASCADE;`,
    );
  }
}
