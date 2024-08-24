import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingAwardsTable1721816580518 implements MigrationInterface {
    name = 'CreatingAwardsTable1721816580518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dd4f9fbeafc739d8769a754d4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46e7ad10daaf39a9f4bf0ddeb6"`);
        await queryRunner.query(`CREATE TABLE "awards" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bc3f6adc548ff46c76c03e06377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "awards_actors_actor" ("awardsId" integer NOT NULL, "actorId" integer NOT NULL, CONSTRAINT "PK_9c6fccd53da4df9db8e3f60201f" PRIMARY KEY ("awardsId", "actorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07fb8c3957cbd10b6007924ae6" ON "awards_actors_actor" ("awardsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d729aef28424468dc02f28ae2" ON "awards_actors_actor" ("actorId") `);
        await queryRunner.query(`CREATE TABLE "awards_movies_movie" ("awardsId" integer NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_85b5a3a1d47d8f9b850d0700c63" PRIMARY KEY ("awardsId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_94a7c061b141c9716aa09f8abc" ON "awards_movies_movie" ("awardsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d891d64b82d044126abf2ba2cc" ON "awards_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD "character" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_7dd4f9fbeafc739d8769a754d4" ON "movie_actor_actor" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_46e7ad10daaf39a9f4bf0ddeb6" ON "movie_actor_actor" ("actorId") `);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "awards_actors_actor" ADD CONSTRAINT "FK_07fb8c3957cbd10b6007924ae60" FOREIGN KEY ("awardsId") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "awards_actors_actor" ADD CONSTRAINT "FK_5d729aef28424468dc02f28ae20" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "awards_movies_movie" ADD CONSTRAINT "FK_94a7c061b141c9716aa09f8abc4" FOREIGN KEY ("awardsId") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "awards_movies_movie" ADD CONSTRAINT "FK_d891d64b82d044126abf2ba2ccb" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "awards_movies_movie" DROP CONSTRAINT "FK_d891d64b82d044126abf2ba2ccb"`);
        await queryRunner.query(`ALTER TABLE "awards_movies_movie" DROP CONSTRAINT "FK_94a7c061b141c9716aa09f8abc4"`);
        await queryRunner.query(`ALTER TABLE "awards_actors_actor" DROP CONSTRAINT "FK_5d729aef28424468dc02f28ae20"`);
        await queryRunner.query(`ALTER TABLE "awards_actors_actor" DROP CONSTRAINT "FK_07fb8c3957cbd10b6007924ae60"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46e7ad10daaf39a9f4bf0ddeb6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dd4f9fbeafc739d8769a754d4"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD "character" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d891d64b82d044126abf2ba2cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94a7c061b141c9716aa09f8abc"`);
        await queryRunner.query(`DROP TABLE "awards_movies_movie"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d729aef28424468dc02f28ae2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07fb8c3957cbd10b6007924ae6"`);
        await queryRunner.query(`DROP TABLE "awards_actors_actor"`);
        await queryRunner.query(`DROP TABLE "awards"`);
        await queryRunner.query(`CREATE INDEX "IDX_46e7ad10daaf39a9f4bf0ddeb6" ON "movie_actor_actor" ("actorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7dd4f9fbeafc739d8769a754d4" ON "movie_actor_actor" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
