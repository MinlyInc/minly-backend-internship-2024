// import { getConnectionManager, Connection } from "typeorm";
// import { Movie } from "./src/Entites/movie.entity";
// import { randomBytes } from "crypto";

// const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller"];

// async function updateMovieData() {
//     const connectionManager = getConnectionManager();
//     const connection = connectionManager.create();

//     try {
//         if (!connection.isConnected) {
//             await connection.connect();
//         }

//         const movieRepository = connection.getRepository(Movie);
//         const movies = await movieRepository.find();

//         for (const movie of movies) {
//             movie.overview = randomBytes(20).toString('hex'); // Generate random hex string for overview
//             movie.genre = genres[Math.floor(Math.random() * genres.length)]; // Select a random genre
//             await movieRepository.save(movie);
//         }

//         console.log('Overview and genre updated for all movies');
//     } catch (error) {
//         console.error('Error updating movies:', error);
//     } finally {
//         await connection.close();
//     }
// }

// updateMovieData().catch(error => console.log(error));