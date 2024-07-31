import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class CreateBaseModel1722422106779 implements MigrationInterface {
    name = 'CreateBaseModel1722422106779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_award" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie_award" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_476c2d437396d614280b60f082a"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuid"`);

        await queryRunner.query(`ALTER TABLE "movie" ADD "uuid" character varying`);

        const movies = await queryRunner.query(`SELECT "id" FROM "movie"`);
        for (const movie of movies) {
            await queryRunner.query(`UPDATE "movie" SET "uuid" = $1 WHERE "id" = $2`, [uuidv4(), movie.id]);
        }

        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "uuid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_476c2d437396d614280b60f082a" UNIQUE ("uuid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_476c2d437396d614280b60f082a"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_476c2d437396d614280b60f082a" UNIQUE ("uuid")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "movie_award" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "movie_award" DROP COLUMN "created_at"`);
    }
}
