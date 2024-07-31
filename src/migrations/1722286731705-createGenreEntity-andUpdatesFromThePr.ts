import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenreEntityAndUpdatesFromThePr1722286731705 implements MigrationInterface {
    name = 'CreateGenreEntityAndUpdatesFromThePr1722286731705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" RENAME COLUMN "numberOfAward" TO "numberOfAwards"`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "uuid" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre_movies_movie" ("genreId" integer NOT NULL, "movieId" bigint NOT NULL, CONSTRAINT "PK_5b787840ea6352039c37c32e8f0" PRIMARY KEY ("genreId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorID"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP CONSTRAINT "PK_e592fd44ed9b5cfd791a9d5d8eb"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD CONSTRAINT "PK_d37431a574500c808f3a800cac4" PRIMARY KEY ("year", "id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "director_id_seq"`);
        await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "numberOfAward"`);
        await queryRunner.query(`ALTER TABLE "director" ADD "numberOfAward" integer`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "numberOfAwards"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "numberOfAwards" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP CONSTRAINT "PK_d37431a574500c808f3a800cac4"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD CONSTRAINT "PK_eeff605a5b5cdeccf8b15948b3f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "averageRatings" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "averageRatings" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" ADD CONSTRAINT "FK_dff457c114a6294863814818b0f" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" ADD CONSTRAINT "FK_e59764a417d4f8291747b744faa" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" DROP CONSTRAINT "FK_e59764a417d4f8291747b744faa"`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" DROP CONSTRAINT "FK_dff457c114a6294863814818b0f"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "averageRatings" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "averageRatings" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP CONSTRAINT "PK_eeff605a5b5cdeccf8b15948b3f"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD CONSTRAINT "PK_d37431a574500c808f3a800cac4" PRIMARY KEY ("year", "id")`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "numberOfAwards"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "numberOfAwards" bigint`);
        await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "numberOfAward"`);
        await queryRunner.query(`ALTER TABLE "director" ADD "numberOfAward" bigint`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "director_id_seq" OWNED BY "director"."id"`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "id" SET DEFAULT nextval('"director_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP CONSTRAINT "PK_d37431a574500c808f3a800cac4"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD CONSTRAINT "PK_e592fd44ed9b5cfd791a9d5d8eb" PRIMARY KEY ("year")`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorID" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e59764a417d4f8291747b744fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dff457c114a6294863814818b0"`);
        await queryRunner.query(`DROP TABLE "genre_movies_movie"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`ALTER TABLE "actor" RENAME COLUMN "numberOfAwards" TO "numberOfAward"`);
    }

}
