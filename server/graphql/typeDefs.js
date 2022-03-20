const { gql } = require('apollo-server');

module.exports = gql`

    type User{
        id:ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Movie{
        MovieId:String
        Title:String
        Year:String
        Plot:String
        Genre:String
        Director:String
        Runtime :String
        Released :String
        Language:String
        Country:String
        Poster:String
        imdb:String
        MetaScore:String
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    # A book has a title and author
    type Book {
        title: String
        author: String
    }
    type Query{
        sayHi:String
        GetMovie(Title: String): Movie
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        createMovie(Title: String): Movie
        login(username:String!, password: String!): User!
    }
`;