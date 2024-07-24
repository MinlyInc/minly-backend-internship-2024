import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDirectorEntity1721038352995 implements MigrationInterface {
    name = 'UpdateDirectorEntity1721038352995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "trailer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" ADD "trailer" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "director" ADD "title" character varying(255) NOT NULL`);
    }

}
