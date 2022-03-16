const {model, Schema} = require('mongoose');


const timeslotSchema = new Schema({
    movieId: String,
    movieTitle: String,
    date: String,
    timeSlot: String,
    seating: [[{row: String, number: String, id: String, isReserved: Boolean}]],
    availableSeats: Number,
    theater: Number
}, {timestamps: true})

module.exports = model("Timeslot", timeslotSchema);