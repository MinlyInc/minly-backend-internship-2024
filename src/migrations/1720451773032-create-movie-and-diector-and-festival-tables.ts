import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieAndDiectorAndFestivalTables1720451773032 implements MigrationInterface {
    name = 'CreateMovieAndDiectorAndFestivalTables1720451773032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actor" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthDate" character varying NOT NULL, "nationality" character varying NOT NULL, "bio" character varying NOT NULL, "numberOfAwards" integer, "picture" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "uuId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_ae202be9e278fccac2511f26624" PRIMARY KEY ("id", "uuId"))`);
        await queryRunner.query(`CREATE TYPE "public"."directors_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "directors" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthDate" character varying NOT NULL, "gender" "public"."directors_gender_enum" NOT NULL DEFAULT 'male', "nationality" character varying NOT NULL, "bio" character varying NOT NULL, "numberOfAwards" integer, "picture" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "uuId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_b507da5959cc0c13a343a7c23cf" PRIMARY KEY ("id", "uuId"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "releaseDate" character varying NOT NULL, "rating" numeric(3,2) NOT NULL DEFAULT '0', "moviePoster" character varying, "trailer" character varying, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "uuId" uuid NOT NULL DEFAULT uuid_generate_v4(), "actorId" integer NOT NULL, "directorsId" integer NOT NULL, "festivalId" integer NOT NULL, "directorId" integer, "directorUuId" uuid, CONSTRAINT "PK_5da6d1a49df448c09ddf3cee372" PRIMARY KEY ("id", "uuId"))`);
        await queryRunner.query(`CREATE TABLE "directors_actors_actor" ("directorsId" integer NOT NULL, "directorsUuId" uuid NOT NULL, "actorId" integer NOT NULL, "actorUuId" uuid NOT NULL, CONSTRAINT "PK_b917b433b1ff93c577ed09278c5" PRIMARY KEY ("directorsId", "directorsUuId", "actorId", "actorUuId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35c350c73a0eaa419eb205f354" ON "directors_actors_actor" ("directorsId", "directorsUuId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b4b13fc2d58d90ddba0fc5568" ON "directors_actors_actor" ("actorId", "actorUuId") `);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a5600347f1d1511e100b6f0e46e" FOREIGN KEY ("directorId", "directorUuId") REFERENCES "directors"("id","uuId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "directors_actors_actor" ADD CONSTRAINT "FK_35c350c73a0eaa419eb205f3549" FOREIGN KEY ("directorsId", "directorsUuId") REFERENCES "directors"("id","uuId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "directors_actors_actor" ADD CONSTRAINT "FK_1b4b13fc2d58d90ddba0fc5568a" FOREIGN KEY ("actorId", "actorUuId") REFERENCES "actor"("id","uuId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "directors_actors_actor" DROP CONSTRAINT "FK_1b4b13fc2d58d90ddba0fc5568a"`);
        await queryRunner.query(`ALTER TABLE "directors_actors_actor" DROP CONSTRAINT "FK_35c350c73a0eaa419eb205f3549"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a5600347f1d1511e100b6f0e46e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b4b13fc2d58d90ddba0fc5568"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35c350c73a0eaa419eb205f354"`);
        await queryRunner.query(`DROP TABLE "directors_actors_actor"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "directors"`);
        await queryRunner.query(`DROP TYPE "public"."directors_gender_enum"`);
        await queryRunner.query(`DROP TABLE "actor"`);
    }

}
