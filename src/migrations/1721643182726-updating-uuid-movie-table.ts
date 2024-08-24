import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingUuidMovieTable1721643182726 implements MigrationInterface {
    name = 'UpdatingUuidMovieTable1721643182726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" ADD "uuId" character varying`);
        await queryRunner.query(`ALTER TABLE "directors" ADD "uuId" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "uuId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuId"`);
        await queryRunner.query(`ALTER TABLE "directors" DROP COLUMN "uuId"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "uuId"`);
    }

}
