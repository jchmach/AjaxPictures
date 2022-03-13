import mongoose from "mongoose";


const timeslotSchema = new mongoose.Schema({
    movieId: String,
    movieTitle: String,
    date: String,
    timeSlot: String,
    Seating: [{row: String, number: String, id: String}],
    availableSeats: Number,
    theater: Number
}, {timestamps: true})

export default mongoose.model('Timeslot', timeslotSchema);