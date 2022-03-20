const userResolvers = require('./users');
const timeslotResolvers = require('./timeslot');
const ticketResolvers = require('./ticket');
const movieResolvers = require('./movie');
module.exports={
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