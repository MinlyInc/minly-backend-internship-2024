import { MigrationInterface, QueryRunner } from "typeorm";

export class InitalMigration1720449718083 implements MigrationInterface {
    name = 'InitalMigration1720449718083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "director" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "birth_date" date NOT NULL, "bio" character varying, "gender" "public"."director_gender_enum" NOT NULL, "nationality" character varying NOT NULL, "uuid" character varying NOT NULL, "picture" character varying, "number_of_awards" bigint, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_df89f81bac8fa9709d270a424bf" UNIQUE ("uuid"), CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actor" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "birth_date" date NOT NULL, "gender" "public"."actor_gender_enum" NOT NULL, "bio" character varying, "nationality" character varying NOT NULL, "uuid" character varying NOT NULL, "picture" character varying, "number_of_awards" bigint, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_3ada272ec56626c8965a4da07af" UNIQUE ("uuid"), CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "release_date" TIMESTAMP WITH TIME ZONE NOT NULL, "title" character varying NOT NULL, "poster" character varying, "average_rating" double precision, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "uuid" character varying NOT NULL, "trailer" character varying, "director_id" integer, CONSTRAINT "UQ_476c2d437396d614280b60f082a" UNIQUE ("uuid"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_actor" ("movie_id" integer NOT NULL, "actor_id" integer NOT NULL, CONSTRAINT "PK_57f7ec79e5080ab66c02e776832" PRIMARY KEY ("movie_id", "actor_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3315be503ed4c23e4c12c2aba5" ON "movie_actor" ("movie_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_475e8562aad43168679b898ff5" ON "movie_actor" ("actor_id") `);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_8aefbf59e604cdd127da5a093c5" FOREIGN KEY ("director_id") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_8aefbf59e604cdd127da5a093c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_475e8562aad43168679b898ff5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3315be503ed4c23e4c12c2aba5"`);
        await queryRunner.query(`DROP TABLE "movie_actor"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "actor"`);
        await queryRunner.query(`DROP TABLE "director"`);
    }

}
