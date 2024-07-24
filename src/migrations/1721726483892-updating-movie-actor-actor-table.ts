import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingMovieActorActorTable1721726483892 implements MigrationInterface {
    name = 'UpdatingMovieActorActorTable1721726483892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dd4f9fbeafc739d8769a754d4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46e7ad10daaf39a9f4bf0ddeb6"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD "character" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_7dd4f9fbeafc739d8769a754d4" ON "movie_actor_actor" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_46e7ad10daaf39a9f4bf0ddeb6" ON "movie_actor_actor" ("actorId") `);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46e7ad10daaf39a9f4bf0ddeb6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dd4f9fbeafc739d8769a754d4"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP COLUMN "character"`);
        await queryRunner.query(`CREATE INDEX "IDX_46e7ad10daaf39a9f4bf0ddeb6" ON "movie_actor_actor" ("actorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7dd4f9fbeafc739d8769a754d4" ON "movie_actor_actor" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
