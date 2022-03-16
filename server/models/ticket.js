const {model, Schema} = require('mongoose');

const ticketSchema = new Schema({
    userId: String,
    movieId: String,
    movieTitle: String,
    date: String,
    timeSlot: String,
    seatRow: String,
    seatNumber: Number
}, {timestamps: true})

module.exports = model("Ticker", ticketSchema);