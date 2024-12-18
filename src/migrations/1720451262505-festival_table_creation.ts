import { MigrationInterface, QueryRunner } from "typeorm";

export class FestivalTableCreation1720451262505 implements MigrationInterface {
    name = 'FestivalTableCreation1720451262505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "festival" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" date NOT NULL, "uuid" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_1c96b1c30fcee5944e30e254a2e" UNIQUE ("uuid"), CONSTRAINT "PK_f1bcb856ab1c89180702ea0b47c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_festival" ("festival_id" integer NOT NULL, "movie_id" integer NOT NULL, CONSTRAINT "PK_d991c68dd9bd2b74153cf1d8162" PRIMARY KEY ("festival_id", "movie_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2088304eddeef47464254284c7" ON "movie_festival" ("festival_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d9db9c773c7b818622228d9fa" ON "movie_festival" ("movie_id") `);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_476c2d437396d614280b60f082a"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "uuid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_476c2d437396d614280b60f082a" UNIQUE ("uuid")`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_2088304eddeef47464254284c7b" FOREIGN KEY ("festival_id") REFERENCES "festival"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_5d9db9c773c7b818622228d9fab" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_5d9db9c773c7b818622228d9fab"`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_2088304eddeef47464254284c7b"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_476c2d437396d614280b60f082a"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "uuid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_476c2d437396d614280b60f082a" UNIQUE ("uuid")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d9db9c773c7b818622228d9fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2088304eddeef47464254284c7"`);
        await queryRunner.query(`DROP TABLE "movie_festival"`);
        await queryRunner.query(`DROP TABLE "festival"`);
    }

}
