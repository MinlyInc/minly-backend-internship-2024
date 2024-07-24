import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateJunctionTable1721656932851 implements MigrationInterface {
    name = 'UpdateJunctionTable1721656932851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_actor_actor" ("movieId" bigint NOT NULL, "actorId" bigint NOT NULL, "character" character varying NOT NULL, CONSTRAINT "PK_075b34b34ca9fd64271e392d454" PRIMARY KEY ("movieId", "actorId"))`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_46e7ad10daaf39a9f4bf0ddeb6c" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_46e7ad10daaf39a9f4bf0ddeb6c"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a"`);
        await queryRunner.query(`DROP TABLE "movie_actor_actor"`);
    }

}
