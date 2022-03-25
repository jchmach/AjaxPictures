//const {model, Schema} = require('mongoose');
import mongoose from 'mongoose';

const timeslotSchema = new mongoose.Schema({
    movieId: String,
    movieTitle: String,
    date: String,
    timeSlot: String,
    seating: [[{row: String, number: String, id: String, isReserved: Boolean}]],
    availableSeats: Number,
    theater: Number
}, {timestamps: true})

export default mongoose.model("Timeslot", timeslotSchema);