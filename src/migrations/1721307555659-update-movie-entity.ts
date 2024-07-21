import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMovieEntity1721307555659 implements MigrationInterface {
    name = 'UpdateMovieEntity1721307555659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "overview" text`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "genre" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
    }

}
