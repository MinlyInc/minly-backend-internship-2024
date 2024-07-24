import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWriterEntity1721307178930 implements MigrationInterface {
    name = 'CreateWriterEntity1721307178930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."writer_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "writer" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "gender" "public"."writer_gender_enum" NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthDate" date, "nationality" character varying, "uuid" character varying NOT NULL, CONSTRAINT "PK_e43f7a41e79384a71f5e201c323" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "writer"`);
        await queryRunner.query(`DROP TYPE "public"."writer_gender_enum"`);
    }

}
