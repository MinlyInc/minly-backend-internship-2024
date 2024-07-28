import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieActorAwardTable1721813615267 implements MigrationInterface {
    name = 'CreateMovieActorAwardTable1721813615267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "award" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e887e4e69663925ebb60d3a7775" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_actor_award" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "year" integer NOT NULL, "type" character varying NOT NULL, "role" character varying NOT NULL, "actorMoviesMovieMovieId" bigint, "actorMoviesMovieActorId" bigint, "awardId" bigint, CONSTRAINT "PK_e592fd44ed9b5cfd791a9d5d8eb" PRIMARY KEY ("year"))`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD CONSTRAINT "FK_eb945538031ede2cc23d3ddaa2b" FOREIGN KEY ("actorMoviesMovieMovieId", "actorMoviesMovieActorId") REFERENCES "actor_movies_movie"("movieId","actorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" ADD CONSTRAINT "FK_3cd871b4c3635fb5e6cbcb3b668" FOREIGN KEY ("awardId") REFERENCES "award"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP CONSTRAINT "FK_3cd871b4c3635fb5e6cbcb3b668"`);
        await queryRunner.query(`ALTER TABLE "movie_actor_award" DROP CONSTRAINT "FK_eb945538031ede2cc23d3ddaa2b"`);
        await queryRunner.query(`DROP TABLE "movie_actor_award"`);
        await queryRunner.query(`DROP TABLE "award"`);
    }

}
