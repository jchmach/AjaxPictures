// const {model, Schema} = require('mongoose');
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    userId: String,
    movieId: String,
    movieTitle: String,
    date: String,
    timeSlot: String,
    seatRow: String,
    seatNumber: Number
}, {timestamps: true})

export default mongoose.model("Ticket", ticketSchema);