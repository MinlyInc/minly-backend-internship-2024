import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieEntityUpdateGenresAdded1721656104234 implements MigrationInterface {
    name = 'MovieEntityUpdateGenresAdded1721656104234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "genres" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genres"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
