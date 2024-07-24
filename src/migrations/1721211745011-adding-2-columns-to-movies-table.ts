import { MigrationInterface, QueryRunner } from "typeorm";

export class Adding2ColumnsToMoviesTable1721211745011 implements MigrationInterface {
    name = 'Adding2ColumnsToMoviesTable1721211745011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "overview" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "language" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "genre" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
    }

}
