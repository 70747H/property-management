import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1692832256559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "unit" ("id" SERIAL NOT NULL, "unit_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "propertyId" integer, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "property" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" geography(Point,4326), "property_type" character varying NOT NULL, "price_per_sqm" integer NOT NULL, "number_of_rooms" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84dcf9f23967db4751d0e72f98" ON "property" USING GiST ("location") `,
    );
    await queryRunner.query(
      `CREATE TABLE "leased_properties" ("id" SERIAL NOT NULL, "description" text, "start_date" TIMESTAMP WITH TIME ZONE, "end_date" TIMESTAMP WITH TIME ZONE, "tenant_id" integer, "property_id" integer, CONSTRAINT "PK_505e8ddcec6a7bf809d77dafcbc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contact_details" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "landlord" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contact_details" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_db48a87925757d1ca10e0f250f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "landlord_properties" ("landlordId" integer NOT NULL, "propertyId" integer NOT NULL, CONSTRAINT "PK_dc2804612b29b4538efe2c37fbc" PRIMARY KEY ("landlordId", "propertyId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a03e459b51af3a483a0cd724c5" ON "landlord_properties" ("landlordId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4bfa09728bdc729318c72ceba9" ON "landlord_properties" ("propertyId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "unit" ADD CONSTRAINT "FK_df297555036819b1a6e1ebe777b" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "leased_properties" ADD CONSTRAINT "FK_0382fb788e8df7e3027b039eb30" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "leased_properties" ADD CONSTRAINT "FK_7acaa01fcbd091cfb9888dd2651" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "landlord_properties" ADD CONSTRAINT "FK_a03e459b51af3a483a0cd724c5e" FOREIGN KEY ("landlordId") REFERENCES "landlord"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "landlord_properties" ADD CONSTRAINT "FK_4bfa09728bdc729318c72ceba99" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "landlord_properties" DROP CONSTRAINT "FK_4bfa09728bdc729318c72ceba99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "landlord_properties" DROP CONSTRAINT "FK_a03e459b51af3a483a0cd724c5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leased_properties" DROP CONSTRAINT "FK_7acaa01fcbd091cfb9888dd2651"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leased_properties" DROP CONSTRAINT "FK_0382fb788e8df7e3027b039eb30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "unit" DROP CONSTRAINT "FK_df297555036819b1a6e1ebe777b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4bfa09728bdc729318c72ceba9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a03e459b51af3a483a0cd724c5"`,
    );
    await queryRunner.query(`DROP TABLE "landlord_properties"`);
    await queryRunner.query(`DROP TABLE "landlord"`);
    await queryRunner.query(`DROP TABLE "tenant"`);
    await queryRunner.query(`DROP TABLE "leased_properties"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84dcf9f23967db4751d0e72f98"`,
    );
    await queryRunner.query(`DROP TABLE "property"`);
    await queryRunner.query(`DROP TABLE "unit"`);
  }
}
