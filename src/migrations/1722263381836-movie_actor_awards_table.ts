import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieActorAwardsTable1722263381836 implements MigrationInterface {
    name = 'MovieActorAwardsTable1722263381836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_award" ("id" SERIAL NOT NULL, "awardName" character varying NOT NULL, "category" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_1d0ba3a914ce04ee067ae9572a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_awards_movie_actors" ("movieAward_id" integer NOT NULL, "movieActor_id" integer NOT NULL, CONSTRAINT "PK_85718207d5a151ee8ddd344953d" PRIMARY KEY ("movieAward_id", "movieActor_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b44f06ec7cc76cb669fcbf20c" ON "movie_awards_movie_actors" ("movieAward_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f496922732dafc920e73ff6a0e" ON "movie_awards_movie_actors" ("movieActor_id") `);
        await queryRunner.query(`ALTER TABLE "movie_actor" ALTER COLUMN "characterName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_awards_movie_actors" ADD CONSTRAINT "FK_7b44f06ec7cc76cb669fcbf20cd" FOREIGN KEY ("movieAward_id") REFERENCES "movie_award"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_awards_movie_actors" ADD CONSTRAINT "FK_f496922732dafc920e73ff6a0ef" FOREIGN KEY ("movieActor_id") REFERENCES "movie_actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_awards_movie_actors" DROP CONSTRAINT "FK_f496922732dafc920e73ff6a0ef"`);
        await queryRunner.query(`ALTER TABLE "movie_awards_movie_actors" DROP CONSTRAINT "FK_7b44f06ec7cc76cb669fcbf20cd"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ALTER COLUMN "characterName" SET NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f496922732dafc920e73ff6a0e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b44f06ec7cc76cb669fcbf20c"`);
        await queryRunner.query(`DROP TABLE "movie_awards_movie_actors"`);
        await queryRunner.query(`DROP TABLE "movie_award"`);
    }

}
