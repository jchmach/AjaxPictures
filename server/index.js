import {ApolloServer} from 'apollo-server';
import mongoose from 'mongoose'
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import { CONNECTION_URL } from './config.js';

const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context:({req}) => ({req})
});

mongoose.
    connect(CONNECTION_URL, { useNewUrlParser: true})
    .then(()=> {
        console.log("MONGODB connected")
        return server.listen({port:5000})
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error(err)
    })