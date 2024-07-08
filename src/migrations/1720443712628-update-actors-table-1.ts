import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateActorsTable11720443712628 implements MigrationInterface {
    name = 'UpdateActorsTable11720443712628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."directors_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "directors" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthDate" character varying NOT NULL, "gender" "public"."directors_gender_enum" NOT NULL DEFAULT 'male', "nationality" character varying NOT NULL, "bio" character varying NOT NULL, "numberOfAwards" integer, "picture" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "uuId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_b507da5959cc0c13a343a7c23cf" PRIMARY KEY ("id", "uuId"))`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "trailer" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "createdAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "uuId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_5da6d1a49df448c09ddf3cee372" PRIMARY KEY ("id", "uuId")`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."actor_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "gender" "public"."actor_gender_enum" NOT NULL DEFAULT 'male'`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "nationality" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "bio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "numberOfAwards" integer`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "picture" character varying`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "createdAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "uuId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "PK_05b325494fcc996a44ae6928e5e"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "PK_ae202be9e278fccac2511f26624" PRIMARY KEY ("id", "uuId")`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "moviePoster" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "moviePoster" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "PK_ae202be9e278fccac2511f26624"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "uuId"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "numberOfAwards"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "nationality"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."actor_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_5da6d1a49df448c09ddf3cee372"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "trailer"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "age" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "directors"`);
        await queryRunner.query(`DROP TYPE "public"."directors_gender_enum"`);
    }

}
