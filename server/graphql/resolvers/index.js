import userResolvers from './users.js';
import timeslotResolvers from './timeslot.js';
import ticketResolvers from './ticket.js';
import movieResolvers from './movie.js';

export default {
    Query:{
        ...ticketResolvers.Query,
        ...timeslotResolvers.Query,
        ...movieResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...ticketResolvers.Mutation,
        ...timeslotResolvers.Mutation,
        ...userResolvers.Mutation,
        ...movieResolvers.Mutation,
    }
}