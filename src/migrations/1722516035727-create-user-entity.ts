import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserEntity1722516035727 implements MigrationInterface {
    name = 'CreateUserEntity1722516035727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key and indexes
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dd4f9fbeafc739d8769a754d4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46e7ad10daaf39a9f4bf0ddeb6"`);

        // Create the user table
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "uuid" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);

        // Update ENUM type for directors
        await queryRunner.query(`ALTER TYPE "public"."directors_gender_enum" RENAME TO "directors_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."directors_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`ALTER TABLE "directors" ALTER COLUMN "gender" TYPE "public"."directors_gender_enum" USING "gender"::text::"public"."directors_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."directors_gender_enum_old"`);

        // Update ENUM type for actors
        await queryRunner.query(`ALTER TYPE "public"."actor_gender_enum" RENAME TO "actor_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."actor_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "gender" TYPE "public"."actor_gender_enum" USING "gender"::text::"public"."actor_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."actor_gender_enum_old"`);

        // Drop and recreate 'character' column in 'movie_actor_actor' table
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD "character" character varying`);

        // Set NOT NULL constraints on columns
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "picture" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "overview" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "language" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "genre" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "duration" SET NOT NULL`);

        // Recreate indexes
        await queryRunner.query(`CREATE INDEX "IDX_7dd4f9fbeafc739d8769a754d4" ON "movie_actor_actor" ("movieId")`);
        await queryRunner.query(`CREATE INDEX "IDX_46e7ad10daaf39a9f4bf0ddeb6" ON "movie_actor_actor" ("actorId")`);

        // Recreate foreign key constraint
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse the migration
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46e7ad10daaf39a9f4bf0ddeb6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dd4f9fbeafc739d8769a754d4"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "genre" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "language" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "overview" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "picture" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."actor_gender_enum_old" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "gender" TYPE "public"."actor_gender_enum_old" USING "gender"::text::"public"."actor_gender_enum_old"`);
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "gender" SET DEFAULT 'male'`);
        await queryRunner.query(`DROP TYPE "public"."actor_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."actor_gender_enum_old" RENAME TO "actor_gender_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."directors_gender_enum_old" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "directors" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "directors" ALTER COLUMN "gender" TYPE "public"."directors_gender_enum_old" USING "gender"::text::"public"."directors_gender_enum_old"`);
        await queryRunner.query(`ALTER TABLE "directors" ALTER COLUMN "gender" SET DEFAULT 'male'`);
        await queryRunner.query(`DROP TYPE "public"."directors_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."directors_gender_enum_old" RENAME TO "directors_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD "character" character varying`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`CREATE INDEX "IDX_46e7ad10daaf39a9f4bf0ddeb6" ON "movie_actor_actor" ("actorId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7dd4f9fbeafc739d8769a754d4" ON "movie_actor_actor" ("movieId")`);
        await queryRunner.query(`ALTER TABLE "movie_actor_actor" ADD CONSTRAINT "FK_7dd4f9fbeafc739d8769a754d4a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
