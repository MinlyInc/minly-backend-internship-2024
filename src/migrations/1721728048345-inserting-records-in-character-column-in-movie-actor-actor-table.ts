import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertingRecordsInCharacterColumnInMovieActorActorTable1721728048345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const movieActorActorRecords = await queryRunner.query('SELECT * FROM "movie_actor_actor"');
        for (let i = 0; i < movieActorActorRecords?.length; i++) {
            const currRecord = movieActorActorRecords[i];
            // Generate a random integer between 1 and 100
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            const character = `Character ${randomNumber}`;

            await queryRunner.query(`
                UPDATE "movie_actor_actor" 
                SET "character" = $1 
                WHERE "movieId" = $2 AND "actorId" = $3
            `, [character, currRecord?.movieId, currRecord?.actorId]);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
