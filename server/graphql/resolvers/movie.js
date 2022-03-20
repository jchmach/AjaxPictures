const {UserInputError} = require('apollo-server');
const axios = require("axios")

const Movie = require('../../models/Movie');

module.exports = {
    Query: {
        async GetMovie(root, {Title}, context, info){
            const movie = await Movie.find({Title: Title});
            if (!movie.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movie[0]
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
                imdb: movie.imdbRating,
                MetaScore: movie.Metascore,
            }
            console.log(result_movie)

            return Movie.create(result_movie);
        }
    },
}

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];