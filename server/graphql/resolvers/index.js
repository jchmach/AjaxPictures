const userResolvers = require('./users');
const timeslotResolvers = require('./timeslot');
const ticketResolvers = require('./ticket');
module.exports={
    Query:{
        ...ticketResolvers.Query,
        ...timeslotResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...ticketResolvers.Mutation,
        ...timeslotResolvers.Mutation
    }
};