const {UserInputError} = require('apollo-server');

const Ticket = require('../../models/Ticket');

module.exports = {
    Query: {
        async ticketHistory(root, {userId}, context, info){
            const slots = await Ticket.find({userId: userId});
            if (!slots.length) throw new UserInputError('No ticket history found for userId ' + userId);
            return slots;
        },
        async ticketsByMovie(root, {movieId}, context, info){
            const slots = await Ticket.find({movieId: movieId});
            if (!slots.length) throw new UserInputError('No tickets bought for movie: ' + movieId);
            return slots;
        },
        async ticketsByDate(root, {date}, context, info){
            const slots = await Ticket.find({date: date});
            if (!slots.length) throw new UserInputError('No tickets bought for date: ' + date);
            return slots;
        },
        async ticketsByMovieDate (root, {movieId, date}, context, info){
            const slots = await Timeslot.find({movieId: movieId, date: date});
            if (!slots.length) throw new UserInputError('No tickets bought for movie: ' + movieId + " for date: " + date);
            return slots;
        }
    },
    Mutation: {
        async purchaseTickets(root, {userId, seats}, context, info){
            for (let i = 0; i < seats.length; i++){
                Ticket.create({userId: userId, movieId: seats[i].movieId, movieTitle: seats[i].movieTitle, date: seats[i].date, timeSlot: seats[i].timeSlot, seatRow: seats[i].seatRow, seatNumber: seat[i].seatNumber}, 
                    function(err){
                        if (err) throw new UserInputError("Error purchasing ticket for movieId " + seats[i].movieId);
                    });
            } 
            return "Purchase successful";
        },
        async refundTicket (root, {ticketId}, context, info){
            return Ticket.deleteOne({id: ticketId});
        }
    }
}