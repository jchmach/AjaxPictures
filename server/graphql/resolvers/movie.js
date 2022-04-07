import axios from 'axios';
import Movie from '../../models/Movie.js';
import {UserInputError} from 'apollo-server';
import Ticket from '../../models/ticket.js';
import Timeslot from '../../models/timeslot.js';
export default {
    Query: {
        async GetMovie(root, {Title}, context, info){
            const movie = await Movie.find({Title: Title});
            if (!movie.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movie[0]
        },
        async GetMovieYear(root, {Title,Year}, context, info){
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
        },
        async getLocalMovieList(root, {search}, context, info){
            const movie = await Movie.find({Title: {"$regex": search}});
            if (!movie.length) throw new UserInputError("Movie " + search +" does not exist in database")
            return movie
        },
        async GetMovies(root,{}, context, info){
            const movies = await Movie.find();
            if (!movies.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movies
        },
        async GetMoviesGenre(root,{Genre}, context, info){
            const movies = await Movie.find({Genre: Genre});
            if (!movies.length) throw new UserInputError('No movie with that title exists in DB ' + Title);
            return movies
        }
    },
    Mutation: {
        async createMovie(root, {Title}, context, info){
            const mov = await axios.get("https://www.omdbapi.com/?t=" 
                            + Title
                            + "&apikey=362bd303")
            const movie = mov.data
            const result_movie = {
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

            return Movie.create(result_movie);
        },
        async createMovieYear(root, {Title, Year}, context, info){
            const path = "https://www.omdbapi.com/?t=" 
            + Title + "&y="
            + Year
            + "&apikey=362bd303"
            const mov = await axios.get(path)
            const movie = mov.data
            const result_movie = {
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

            return Movie.create(result_movie);
        },
        async removeMovie(root, {movieId}, context, info){
            const current = new Date();
    
            var dates = [];
            // Get all dates in the next two weeks besides today
            for (var i = 1; i < 15; i++){
                var tempDate = new Date();
                tempDate.setDate(current.getDate() + i);
                dates.push(tempDate.toLocaleDateString("en-CA", {month:"long", day: "numeric", year:"numeric"}));
            }
            // Delete those tickets
            await Ticket.deleteMany({movieId: movieId, date: {"$in": dates}});
            // Delete the tickets for showings today that havent aired yet
            dates = ["10:00 AM",
                "12:00 PM",
                "3:00 PM",
                "5:00 PM",
                "7:00 PM",
                "9:00 PM",
                "11:00 PM"]	
            var date = current.toLocaleDateString("en-CA", {month:"long", day: "numeric", year:"numeric"});
            var dateStrings = dates.map(time => new Date(date + " "+ time))
            var futureTimes = dateStrings.filter(date => date > current)
            dates = futureTimes.map(date => date.toLocaleTimeString("en-CA", {hour: "numeric", minute:"numeric", hour12: true}))
            dates = dates.map(time => time.toUpperCase().replaceAll(".", ""))          
            await Ticket.deleteMany({movieId: movieId, date: date, timeSlot: {"$in": dates}})
            // Delete all timeslots
            await Timeslot.deleteMany({movieId: movieId});
            return Movie.deleteOne({_id: movieId});
        }

    },

}