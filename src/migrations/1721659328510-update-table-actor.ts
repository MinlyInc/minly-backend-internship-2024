import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableActor1721659328510 implements MigrationInterface {
    name = 'UpdateTableActor1721659328510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" DROP CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48fa78b2634b01bf58ad1686ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45708bd514560bac8a3a54470d"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "bio" character varying(1000) NULL`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" ADD "character" character varying`);
        // await queryRunner.query(`ALTER TABLE "movie" ADD "overview" text`);
        // await queryRunner.query(`ALTER TABLE "movie" ADD "genre" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" ADD CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" DROP CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "bio"`);
        await queryRunner.query(`CREATE INDEX "IDX_45708bd514560bac8a3a54470d" ON "actor_movies_movie" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_48fa78b2634b01bf58ad1686ef" ON "actor_movies_movie" ("actorId") `);
        await queryRunner.query(`ALTER TABLE "actor_movies_movie" ADD CONSTRAINT "FK_48fa78b2634b01bf58ad1686ef5" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
