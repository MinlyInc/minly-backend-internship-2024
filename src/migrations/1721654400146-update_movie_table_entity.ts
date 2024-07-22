import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMovieTableEntity1721654400146 implements MigrationInterface {
    name = 'UpdateMovieTableEntity1721654400146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "duration" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "overview" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "language" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "duration"`);
    }

}
