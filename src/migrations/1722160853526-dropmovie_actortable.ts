import { MigrationInterface, QueryRunner } from "typeorm";

export class DropMovieActorTable1722159547803 implements MigrationInterface {
    name = 'DropMovieActorTable1722159547803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "movie_actor"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // You might want to recreate the table structure here in case you need to rollback the migration.
        await queryRunner.query(`
            CREATE TABLE "movie_actor" (
                "movie_id" integer NOT NULL,
                "actor_id" integer NOT NULL,
                CONSTRAINT "PK_57f7ec79e5080ab66c02e776832" PRIMARY KEY ("movie_id", "actor_id")
            )
        `);
    }
}
