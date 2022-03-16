import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"

import Timeslot  from "../models/timeslot.js"


export default {
    Query: {
        timeslots: (root, {movieId, date, timeSlot}, context, info) => {
            const slot = await Timeslot.findOne({movieId: movieId, date: date, timeSlot: timeSlot});
            if (!slot) throw new UserInputError('No timeslot found for movie: ' + movieId + ' and time: ' + date + " " + timeSlot);
            return slot;
        },
        timeslotTimes: (root, {movieId, date}, context, info) => {
            const slots = await Timeslot.find({movieId: movieId, date: date});
            if (!slots.length) throw new UserInputError('No timeslots found for movie: ' + movieId + ' on date: ' + date);
            return slots;
        },
        timeslotDates: (root, {movieId}, context, info) =>{
            const slots = await Timeslot.find({movieId: movieId});
            if (!slots.length) throw new UserInputError('No dates found for movie: ' + movieId);
            return slots;
        }
    },
    Mutation: {
        createTimeslot: (root, {movieId, movieTitle, theater, date, timeSlot}, context, info) => {
            const seating = [];
            for (let i = 1; i < 14; i++){
                row = [];
                rowLetter = String.fromCharCode(i + 96);
                seats = 17;
                if (i < 3){
                    seats = 13
                }
                for (let j = 0; j < seats; j++){
                    row.push({number: j + 1, id: rowLetter + (j + 1), isReserved: false});
                }
                seating.push(row);
            }
            return Timeslot.create({movieId: movieId, movieTitle: movieTitle, theater: theater, date: date, timeSlot: timeSlot, seating: seating, availableSeats: 213});
        },
        removeTimeslot: (root, {movieId, date, timeSlot}, context, info) =>{
            return Timeslot.deleteOne({movieId: movieId, date: date, timeSlot: timeSlot});
        },
        reserveSeats: (root, {seats, movieId, date, timeSlot}, context, info) => {
            const slot = await Timeslot.findOne({movieId: movieId, date: date, timeSlot: timeSlot});
            const seating = slot.seating;
            for (let i = 0; i < seats.length; i++){
                const row = "hello"
            }
        }

    }


}