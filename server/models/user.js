import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt:String,
    preferredGenre1: String,
    preferredGenre2: String,
    preferredGenre3: String
});

export default mongoose.model('User', userSchema);