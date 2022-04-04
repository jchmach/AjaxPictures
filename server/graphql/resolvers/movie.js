import axios from 'axios';
import Movie from '../../models/Movie.js';
import {UserInputError} from 'apollo-server';

export default {
    Query: {
        async GetMovie(root, {Title}, context, info){
            console.log(Title)
            const movie = await Movie.find({Title: Title});
            if (!movie.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movie[0]
        },
        async GetMovieYear(root, {Title,Year}, context, info){
            console.log(Title)
            const movie = await Movie.find({Title: Title, Year:Year});
            if (!movie.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movie[0]
        },
        async getMovieOMDB(root, {movieTitle}, context, info){
            const resp = await axios.get("https://www.omdbapi.com/?s=" 
                + movieTitle
            + "&type=movie&apikey=362bd303");
            if (resp.data.Response === "False"){
                throw new UserInputError(resp.data.Error);
            }
            const results = resp.data.Search
            return results
        }
    },
    Mutation: {
        async createMovie(root, {Title}, context, info){
            const mov = await axios.get("https://www.omdbapi.com/?t=" 
                            + Title
                            + "&apikey=362bd303")
            movie = mov.data
            console.log(movie.Title)
            result_movie = {
                Title: movie.Title,
                Year: movie.Year,
                Plot: movie.Plot,
                Genre: movie.Genre,
                Director: movie.Director,
                Runtime : movie.Runtime,
                Released : movie.Released,
                Language: movie.Language,
                Country: movie.Country,
                Poster: movie.Poster,
                imdb: movie.imdbRating,
                MetaScore: movie.Metascore,
            }
            console.log(result_movie)

            return Movie.create(result_movie);
        },
        async createMovieYear(root, {Title, Year}, context, info){
            const path = "https://www.omdbapi.com/?t=" 
            + Title + "&y="
            + Year
            + "&apikey=362bd303"
            console.log(path)
            const mov = await axios.get(path)
            movie = mov.data
            console.log(movie.Title)
            result_movie = {
                Title: movie.Title,
                Year: movie.Year,
                Plot: movie.Plot,
                Genre: movie.Genre,
                Director: movie.Director,
                Runtime : movie.Runtime,
                Released : movie.Released,
                Language: movie.Language,
                Country: movie.Country,
                Poster: movie.Poster,
                imdb: movie.imdbRating,
                MetaScore: movie.Metascore,
            }
            console.log(result_movie)

            return Movie.create(result_movie);
        }
    },
}