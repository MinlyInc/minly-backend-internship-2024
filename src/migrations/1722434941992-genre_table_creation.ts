import { MigrationInterface, QueryRunner } from "typeorm";

export class GenreTableCreation1722434941992 implements MigrationInterface {
    name = 'GenreTableCreation1722434941992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre_movies_movie" ("genreId" integer NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_5b787840ea6352039c37c32e8f0" PRIMARY KEY ("genreId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dff457c114a6294863814818b0" ON "genre_movies_movie" ("genreId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e59764a417d4f8291747b744fa" ON "genre_movies_movie" ("movieId") `);
        await queryRunner.query(`CREATE TABLE "movie_genres_genre" ("movieId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_aee18568f9fe4ecca74f35891af" PRIMARY KEY ("movieId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId") `);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genres"`);
        await queryRunner.query(`ALTER TABLE "genre" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "genre" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" ADD CONSTRAINT "FK_dff457c114a6294863814818b0f" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" ADD CONSTRAINT "FK_e59764a417d4f8291747b744faa" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_1996ce31a9e067304ab168d6715"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e"`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" DROP CONSTRAINT "FK_e59764a417d4f8291747b744faa"`);
        await queryRunner.query(`ALTER TABLE "genre_movies_movie" DROP CONSTRAINT "FK_dff457c114a6294863814818b0f"`);
        await queryRunner.query(`ALTER TABLE "genre" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "genre" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "genres" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1996ce31a9e067304ab168d671"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_985216b45541c7e0ec644a8dd4"`);
        await queryRunner.query(`DROP TABLE "movie_genres_genre"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e59764a417d4f8291747b744fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dff457c114a6294863814818b0"`);
        await queryRunner.query(`DROP TABLE "genre_movies_movie"`);
    }

}
