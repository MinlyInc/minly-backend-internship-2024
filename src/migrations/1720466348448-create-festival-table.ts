import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFestivalTable1720466348448 implements MigrationInterface {
    name = 'CreateFestivalTable1720466348448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "festival" ("id" BIGSERIAL NOT NULL, "title" character varying NOT NULL, "uuid" character varying NOT NULL, CONSTRAINT "PK_f1bcb856ab1c89180702ea0b47c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "festival_movies_movie" ("festivalId" bigint NOT NULL, "movieId" bigint NOT NULL, CONSTRAINT "PK_fc5daf3b5918b511f3f674afb52" PRIMARY KEY ("festivalId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9093f672399cb51b4164926a08" ON "festival_movies_movie" ("festivalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_87faa2eaa3fdf780320e643c9c" ON "festival_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "festival_movies_movie" ADD CONSTRAINT "FK_9093f672399cb51b4164926a08f" FOREIGN KEY ("festivalId") REFERENCES "festival"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "festival_movies_movie" ADD CONSTRAINT "FK_87faa2eaa3fdf780320e643c9c0" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "festival_movies_movie" DROP CONSTRAINT "FK_87faa2eaa3fdf780320e643c9c0"`);
        await queryRunner.query(`ALTER TABLE "festival_movies_movie" DROP CONSTRAINT "FK_9093f672399cb51b4164926a08f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87faa2eaa3fdf780320e643c9c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9093f672399cb51b4164926a08"`);
        await queryRunner.query(`DROP TABLE "festival_movies_movie"`);
        await queryRunner.query(`DROP TABLE "festival"`);
    }

}
