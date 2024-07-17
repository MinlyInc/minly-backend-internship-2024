import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieTableAndDirectorTable1720452125105 implements MigrationInterface {
    name = 'CreateMovieTableAndDirectorTable1720452125105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."director_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "director" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "gender" "public"."director_gender_enum" NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "picture" character varying(1000), "birthDate" date, "nationality" character varying, "trailer" character varying(1000), "numberOfAward" bigint, "uuid" character varying NOT NULL, CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "releaseDate" TIMESTAMP WITH TIME ZONE NOT NULL, "poster" character varying(1000), "averageRatings" double precision, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "directorID" bigint NOT NULL, "trailer" character varying(1000), "uuid" character varying NOT NULL, "directorId" bigint, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "director"`);
        await queryRunner.query(`DROP TYPE "public"."director_gender_enum"`);
    }

}
