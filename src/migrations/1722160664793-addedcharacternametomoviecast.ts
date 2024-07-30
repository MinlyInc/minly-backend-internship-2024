// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Addedcharacternametomoviecast1722160664793 implements MigrationInterface {
//     name = 'Addedcharacternametomoviecast1722160664793'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_3315be503ed4c23e4c12c2aba5"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_475e8562aad43168679b898ff5"`);
//         await queryRunner.query(`CREATE TYPE "public"."director_type_enum" AS ENUM('director', 'writer')`);
//         await queryRunner.query(`ALTER TABLE "director" ADD "type" "public"."director_type_enum" NOT NULL DEFAULT 'director'`);
//         await queryRunner.query(`ALTER TABLE "movie" ADD "genres" text array NOT NULL DEFAULT '{}'`);
//         await queryRunner.query(`ALTER TABLE "movie" ADD "writer_id" integer`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD "id" SERIAL NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_57f7ec79e5080ab66c02e776832"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99" PRIMARY KEY ("movie_id", "actor_id", "id")`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD "characterName" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ALTER COLUMN "actor_id" DROP NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_7c13bb438c45e44bfb480560545" PRIMARY KEY ("movie_id", "id")`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ALTER COLUMN "movie_id" DROP NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_7c13bb438c45e44bfb480560545"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_c578a5152d4c32b9ad0bfa7c867" PRIMARY KEY ("id")`);
//         await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_98c0202d382eb3466d61a38dd3b" FOREIGN KEY ("writer_id") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
//         await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_98c0202d382eb3466d61a38dd3b"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_c578a5152d4c32b9ad0bfa7c867"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_7c13bb438c45e44bfb480560545" PRIMARY KEY ("movie_id", "id")`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ALTER COLUMN "movie_id" SET NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_7c13bb438c45e44bfb480560545"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99" PRIMARY KEY ("movie_id", "actor_id", "id")`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ALTER COLUMN "actor_id" SET NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "characterName"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99"`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_57f7ec79e5080ab66c02e776832" PRIMARY KEY ("movie_id", "actor_id")`);
//         await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "id"`);
//         await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "writer_id"`);
//         await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genres"`);
//         await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "type"`);
//         await queryRunner.query(`DROP TYPE "public"."director_type_enum"`);
//         await queryRunner.query(`CREATE INDEX "IDX_475e8562aad43168679b898ff5" ON "movie_actor" ("actor_id") `);
//         await queryRunner.query(`CREATE INDEX "IDX_3315be503ed4c23e4c12c2aba5" ON "movie_actor" ("movie_id") `);
//         await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//     }

// }
