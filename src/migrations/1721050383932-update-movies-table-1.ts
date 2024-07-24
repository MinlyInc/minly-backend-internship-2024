import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMoviesTable11721050383932 implements MigrationInterface {
    name = 'UpdateMoviesTable11721050383932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorsId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a5600347f1d1511e100b6f0e46e"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "directorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a5600347f1d1511e100b6f0e46e" FOREIGN KEY ("directorId", "directorUuId") REFERENCES "directors"("id","uuId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a5600347f1d1511e100b6f0e46e"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "directorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a5600347f1d1511e100b6f0e46e" FOREIGN KEY ("directorId", "directorUuId") REFERENCES "directors"("id","uuId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorsId" integer NOT NULL`);
    }

}
