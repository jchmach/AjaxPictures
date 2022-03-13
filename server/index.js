import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import buildSchema from 'graphql';
import {ApolloServer, gql} from 'apollo-server-express';


import postRoutes from './routes/posts.js';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://ajaxpictures:utscajax1109@ajaxpicturescluster.kyqfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const {
    APP_PORT = 5000,
    NODE_ENV = 'development'
} = process.env

const IN_PROD = NODE_ENV === 'production';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: !IN_PROD
})

await server.start();
server.applyMiddleware({app});


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(APP_PORT, () => console.log(`Server running on port: ${APP_PORT}`)))
    .catch((error) => console.log(error.message));
