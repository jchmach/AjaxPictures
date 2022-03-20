const {model, Schema} = require('mongoose');

const userSchema = new Schema({
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
    MetaScore:String
});

module.exports = model('Movie', userSchema);