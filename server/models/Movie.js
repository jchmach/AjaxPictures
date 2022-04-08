import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    MovieId:String,
    Title:String,
    Year:String,
    Plot:String,
    Genre:String,
    Director:String,
    Runtime :String,
    Released :String,
    Language:String,
    Country:String,
    Poster:String,
    imdb:String,
    MetaScore:String,
    trailerUrl:String
});

export default mongoose.model('Movie', userSchema);