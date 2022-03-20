const userResolvers = require('./users');
const movieResolvers = require('./movie');

module.exports={
    Query:{
        ...movieResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...movieResolvers.Mutation,
    }
};