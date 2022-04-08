import {UserInputError} from 'apollo-server';
import Timeslot from '../../models/timeslot.js'
import Ticket from '../../models/ticket.js';
export default {
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
        },
        async unusedTimeslots(root, {movieId, date}, context, info){
            const dates = ["10:00 AM",
                "12:00 PM",
                "3:00 PM",
                "5:00 PM",
                "7:00 PM",
                "9:00 PM",
                "11:00 PM"]				
            const slots = await Timeslot.find({movieId: movieId, date: date});
            var timeslots = slots.map(slot => slot.timeSlot);
            var results = dates.filter(date => !timeslots.includes(date));
            return results;
        },
        async unusedTheaters(root, {date, timeslot}, context, info){
            var theaters = Array.from(Array(12).keys());
            theaters = theaters.map(number => number + 1);
            const usedSlots = await Timeslot.find({timeSlot: timeslot, date: date});
            var usedTheaters = usedSlots.map(slot => slot.theater);
            var results = theaters.filter(theater => !usedTheaters.includes(theater));
            return results;
        }
    },
    Mutation: {
        async createTimeslot (root, {movieId, movieTitle, theater, date, timeSlot}, context, info) {
            const seating = [];
            for (let i = 1; i < 14; i++){
                var row = [];
                var rowLetter = String.fromCharCode(i + 96);
                var seats = 17;
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
            const current = new Date();
            const sentDate = new Date(date + " " + timeSlot);
            // Check if the to be deleted timeslot is in the future, if so remove all tickets bought for this date
            if (sentDate > current){
                const tickets = await Ticket.find({movieId: movieId, date: date, timeSlot: timeSlot})

                await Ticket.deleteMany({movieId: movieId, date: date, timeSlot: timeSlot})
            }

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
            const availableSeats = slot.availableSeats + seats.length;
            // Update the timeslot with the new seating plan
            return Timeslot.updateOne({movieId: movieId, date: date, timeSlot: timeSlot}, {seating: seating, availableSeats: availableSeats});
        },
        async removeDate (root, {movieId, date}, context, info){
            const current = new Date();
            const sentDate = new Date(date);
            // Check if the to be deleted date is in the future, if so remove all tickets bought for this date

            if (sentDate > current){
                await Ticket.deleteMany({movieId: movieId, date: date})
            } // Check on same date; if its the same we have to remove only tickets for showings that haven't aired yet
            else if (sentDate.toDateString() === current.toDateString()){
                var dates = ["10:00 AM",
                "12:00 PM",
                "3:00 PM",
                "5:00 PM",
                "7:00 PM",
                "9:00 PM",
                "11:00 PM"]	
                var dateStrings = dates.map(time => new Date(date + " "+ time))
                var futureTimes = dateStrings.filter(date => date > current)
                dates = futureTimes.map(date => date.toLocaleTimeString("en-CA", {hour: "numeric", minute:"numeric", hour12: true}))
                dates = dates.map(time => time.toUpperCase().replaceAll(".", ""))          
                await Ticket.deleteMany({movieId: movieId, date: date, timeSlot: {"$in": dates}})
            }
            return (await Timeslot.deleteMany({movieId: movieId, date: date})).deletedCount;
        }
    }
}