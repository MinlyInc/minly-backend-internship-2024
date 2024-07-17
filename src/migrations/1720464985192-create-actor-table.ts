import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActorTable1720464985192 implements MigrationInterface {
    name = 'CreateActorTable1720464985192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."actor_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "actor" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "gender" "public"."actor_gender_enum" NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "picture" character varying(1000), "birthDate" date, "nationality" character varying, "numberOfAward" bigint, "uuid" character varying NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actor_movies_movie" ("actorId" bigint NOT NULL, "movieId" bigint NOT NULL, CONSTRAINT "PK_bb8e9dcbccde7d3edd9383fb25a" PRIMARY KEY ("actorId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" ADD CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" ADD CONSTRAINT "FK_45708bd514560bac8a3a54470d5" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" DROP CONSTRAINT "FK_45708bd514560bac8a3a54470d5"`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" DROP CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45708bd514560bac8a3a54470d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48fa78b2634b01bf58ad1686ef"`);
        await queryRunner.query(`DROP TABLE "actor_movies_movie"`);
        await queryRunner.query(`DROP TABLE "actor"`);
        await queryRunner.query(`DROP TYPE "public"."actor_gender_enum"`);
    }

}
