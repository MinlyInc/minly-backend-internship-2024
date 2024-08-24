import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenderToActorsTable1721039578991 implements MigrationInterface {
    name = 'AddGenderToActorsTable1721039578991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."actor_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "gender" "public"."actor_gender_enum" NOT NULL DEFAULT 'male'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."actor_gender_enum"`);
    }

}
