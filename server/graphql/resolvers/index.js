const userResolvers = require('./users');

module.exports={
    Query:{

    },
    Mutation: {
        ...userResolvers.Mutation
    }
};