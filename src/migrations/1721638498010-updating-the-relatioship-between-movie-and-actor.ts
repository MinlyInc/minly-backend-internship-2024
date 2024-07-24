import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingTheRelatioshipBetweenMovieAndActor1721638498010 implements MigrationInterface {
    name = 'UpdatingTheRelatioshipBetweenMovieAndActor1721638498010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_actor_actor" ("movieId" integer NOT NULL, "movieUuId" uuid NOT NULL, "actorId" integer NOT NULL, "actorUuId" uuid NOT NULL, CONSTRAINT "PK_f1165d9d819eb95d9202d4b98b7" PRIMARY KEY ("movieId", "movieUuId", "actorId", "actorUuId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e867adee76872315c0f9d96c9" ON "movie_actor_actor" ("movieId", "movieUuId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5bc95b427fe03ced0ed74b12fd" ON "movie_actor_actor" ("actorId", "actorUuId") `);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_8e867adee76872315c0f9d96c92" FOREIGN KEY ("movieId", "movieUuId") REFERENCES "movie"("id","uuId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_5bc95b427fe03ced0ed74b12fd0" FOREIGN KEY ("actorId", "actorUuId") REFERENCES "actor"("id","uuId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_5bc95b427fe03ced0ed74b12fd0"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_8e867adee76872315c0f9d96c92"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bc95b427fe03ced0ed74b12fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e867adee76872315c0f9d96c9"`);
        await queryRunner.query(`DROP TABLE "movie_actor_actor"`);
    }

}
