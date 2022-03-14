import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import {ApolloServer, gql} from 'apollo-server-express';


import postRoutes from './routes/posts.js';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';

import {
    APP_PORT, NODE_ENV, CONNECTION_URL, IN_PROD
} from './config.js'

const app = express();
app.disable('x-powered-by')
app.use('/posts', postRoutes);

//app.use(bodyParser.json({ limit: "30mb", extended: true}));
//app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
//app.use(cors());

//const RedisStore = connectRedis(session);
//const redisClient = redis.createClient({
 //   port: 19529,
////    password: 'mJhSGedBY0URrHLodmSSjnlvTRjic0OI',
//    host: 'localhost'
//})

app.use(session({
    //store: new RedisStore({client: redisClient}),
    name: 'sessionName',
    secret: 'shhMySecret!!',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: IN_PROD
    }
}))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: IN_PROD ? false : {
        settings: {
            'request.credentials': 'include'
        }
    },
    context: ({ req, res }) => ({ req, res })
})

await server.start();
server.applyMiddleware({app, cors: false});

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(APP_PORT, () => console.log(`Server running on port: ${APP_PORT}${server.graphqlPath}`)))
    .catch((error) => console.log(error.message));
