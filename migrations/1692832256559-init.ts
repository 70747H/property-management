import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1692832256559 implements MigrationInterface {
  name = 'Init1692832256559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "unit" ("id" SERIAL NOT NULL, "unit_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "propertyId" integer, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contact_details" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "leased_properties" ("id" SERIAL NOT NULL, "description" text, "start_date" TIMESTAMP WITH TIME ZONE, "end_date" TIMESTAMP WITH TIME ZONE, "tenant_id" integer, "property_id" integer, CONSTRAINT "PK_505e8ddcec6a7bf809d77dafcbc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "property" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" geography(Point,4326), "property_type" character varying NOT NULL, "price_per_sqm" integer NOT NULL, "number_of_rooms" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84dcf9f23967db4751d0e72f98" ON "property" USING GiST ("location") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tenant_properties" ("tenantId" integer NOT NULL, "propertyId" integer NOT NULL, CONSTRAINT "PK_d9ca9e6389859e713f0f4dca126" PRIMARY KEY ("tenantId", "propertyId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fc3dcffe2aa594e9b2805bc106" ON "tenant_properties" ("tenantId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_170de7d72bfc23171482324318" ON "tenant_properties" ("propertyId") `,
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
      `ALTER TABLE "tenant_properties" ADD CONSTRAINT "FK_fc3dcffe2aa594e9b2805bc1065" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_properties" ADD CONSTRAINT "FK_170de7d72bfc231714823243185" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tenant_properties" DROP CONSTRAINT "FK_170de7d72bfc231714823243185"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_properties" DROP CONSTRAINT "FK_fc3dcffe2aa594e9b2805bc1065"`,
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
      `DROP INDEX "public"."IDX_170de7d72bfc23171482324318"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fc3dcffe2aa594e9b2805bc106"`,
    );
    await queryRunner.query(`DROP TABLE "tenant_properties"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84dcf9f23967db4751d0e72f98"`,
    );
    await queryRunner.query(`DROP TABLE "property"`);
    await queryRunner.query(`DROP TABLE "leased_properties"`);
    await queryRunner.query(`DROP TABLE "tenant"`);
    await queryRunner.query(`DROP TABLE "unit"`);
  }
}
