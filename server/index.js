//const {ApolloServer} = require('apollo-server');
import {ApolloServer} from 'apollo-server';
// const mongoose = require('mongoose');
import mongoose from 'mongoose'
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import { CONNECTION_URL } from './config.js';

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers')
// const {CONNECTION_URL} = require('./config.js');


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