import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFestivalTable1721046930679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'festival',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'date',
                    type: 'date',
                },
                {
                    name: 'uuId',
                    type: 'uuid',
                    isNullable: false,
                    default: 'uuid_generate_v4()',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('festival');
    }

}
