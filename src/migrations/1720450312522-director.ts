import { MigrationInterface, QueryRunner } from "typeorm";

export class Director1720450312522 implements MigrationInterface {
    name = 'Director1720450312522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."director_genre_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "director" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "genre" "public"."director_genre_enum" NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "picture" character varying(1000), "birthDate" date, "nationality" character varying, "trailer" character varying(1000), "numberOfAward" bigint, "uuid" character varying NOT NULL, CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "director"`);
        await queryRunner.query(`DROP TYPE "public"."director_genre_enum"`);
    }

}
