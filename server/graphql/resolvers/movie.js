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
        async GetMovies(root,{}, context, info){
            const movies = await Movie.find();
            if (!movies.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movies
        },
        async GetMoviesGenre(root,{Genre}, context, info){
            console.log(Genre)
            const movies = await Movie.find({Genre: Genre});
            console.log(movies)
            if (!movies.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movies
        }
    },
    Mutation: {
        async createMovie(root, {Title}, context, info){
            const mov = await axios.get("https://www.omdbapi.com/?t=" 
                            + Title
                            + "&apikey=362bd303")
            console.log(mov)
            let movie = mov.data
            console.log(movie)
            const trailer = await axios.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCi8e0iOVk1fEOogdfu4YgfA&order=relevance&q=" +
            movie.Title + "%20trailer&key=AIzaSyB9_jyOLb4eA5Tq1Ug1IT8kNsDV5LO6RuU")
            let first_item = ((trailer.data.items)[0])
            console.log(first_item)
            let trailerUrl = "https://www.youtube.com/embed/" + first_item.id.videoId
            console.log(trailerUrl)
            let result_movie = {
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
                trailerUrl:trailerUrl
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