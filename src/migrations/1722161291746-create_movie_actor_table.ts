import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieActorTable1722161291746 implements MigrationInterface {
    name = 'CreateMovieActorTable1722161291746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_actor" ("id" SERIAL NOT NULL, "characterName" character varying NOT NULL, "actor_id" integer, "movie_id" integer, CONSTRAINT "PK_c578a5152d4c32b9ad0bfa7c867" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`DROP TABLE "movie_actor"`);
    }

}
