import { MigrationInterface, QueryRunner } from "typeorm";

export class DirectorEntityUpdateWithTypeWriterAndMovieEntityUpdates1721656590256 implements MigrationInterface {
    name = 'DirectorEntityUpdateWithTypeWriterAndMovieEntityUpdates1721656590256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."director_type_enum" AS ENUM('director', 'writer')`);
        await queryRunner.query(`ALTER TABLE "director" ADD "type" "public"."director_type_enum" NOT NULL DEFAULT 'director'`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "writer_id" integer`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_98c0202d382eb3466d61a38dd3b" FOREIGN KEY ("writer_id") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_98c0202d382eb3466d61a38dd3b"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "writer_id"`);
        await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."director_type_enum"`);
    }

}
