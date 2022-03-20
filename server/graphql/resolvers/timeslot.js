const {UserInputError} = require('apollo-server');
const s = require('connect-redis');

const Timeslot = require('../../models/Timeslot');

module.exports = {
    Query: {
        async timeslot(root, {movieId, date, timeSlot}, context, info){
            const slot = await Timeslot.findOne({movieId: movieId, date: date, timeSlot: timeSlot});
            if (!slot) throw new UserInputError('No timeslot found for movie: ' + movieId + ' and time: ' + date + " " + timeSlot);
            return slot;
        },
        async timeslotTimes(root, {movieId, date}, context, info) {
            const slots = await Timeslot.find({movieId: movieId, date: date});
            if (!slots.length) throw new UserInputError('No timeslots found for movie: ' + movieId + ' on date: ' + date);
            return slots;
        },
        async timeslotDates(root, {movieId}, context, info){
            const slots = await Timeslot.find({movieId: movieId});
            if (!slots.length) throw new UserInputError('No dates found for movie: ' + movieId);
            return slots;
        }
    },
    Mutation: {
        async createTimeslot (root, {movieId, movieTitle, theater, date, timeSlot}, context, info) {
            const seating = [];
            for (let i = 1; i < 14; i++){
                row = [];
                rowLetter = String.fromCharCode(i + 96);
                seats = 17;
                if (i < 3){
                    seats = 13
                }
                for (let j = 0; j < seats; j++){
                    row.push({row: i, number: j + 1, id: rowLetter + (j + 1), isReserved: false});
                }
                seating.push(row);
            }
            return Timeslot.create({movieId: movieId, movieTitle: movieTitle, theater: theater, date: date, timeSlot: timeSlot, seating: seating, availableSeats: 213});
        },
        async removeTimeslot (root, {movieId, date, timeSlot}, context, info){
            return Timeslot.deleteOne({movieId: movieId, date: date, timeSlot: timeSlot});
        },
        async reserveSeats (root, {seatReservations: {seats, movieId, date, timeSlot}}, context, info){
            // Get the current timeslots seating plan
            const slot = await Timeslot.findOne({movieId: movieId, date: date, timeSlot: timeSlot});
            const seating = slot.seating;
            // Set selected seats to reserved
            for (let i = 0; i < seats.length; i++){
                const row = seats[i].seatRow;
                seating[row.charCodeAt(0) - 65][parseInt(seats[i].seatNumber) - 1].isReserved = true;
            }
            // Update the seat count
            const availableSeats = slot.availableSeats - seats.length;
            // Update the timeslot with the new seating plan
            return Timeslot.updateOne({movieId: movieId, date: date, timeSlot: timeSlot}, {seating: seating, availableSeats: availableSeats});
        },
        async unreserveSeats (root, {seatReservations: {seats, movieId, date, timeSlot}}, context, info){
            // Get the current timeslots seating plan
            const slot = await Timeslot.findOne({movieId: movieId, date: date, timeSlot: timeSlot});
            const seating = slot.seating;
            // Reset the seats to unreserved
            for (let i = 0; i < seats.length; i++){
                const row = seats[i].seatRow;
                seating[row.charCodeAt(0) - 65][parseInt(seats[i].seatNumber) - 1].isReserved = false;
            }
            // Update the seat count
            const availableSeats = slot.availableSeats - seats.length;
            // Update the timeslot with the new seating plan
            return Timeslot.updateOne({movieId: movieId, date: date, timeSlot: timeSlot}, {seating: seating, availableSeats: availableSeats});
        }

    }
}