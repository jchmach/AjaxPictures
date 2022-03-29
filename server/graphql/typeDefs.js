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
        id:ID!
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
        timeslot(movieId: String, date: String, timeSlot: String ): Timeslot
        timeslotTimes(movieId: String, date: String): [Timeslot]
        timeslotDates(movieId: String): [Timeslot]
        ticketHistory(userId: String!): [Ticket]
        ticketsByMovie(movieId: ID!): [Ticket]
        ticketsByDate(date: String): [Ticket]
        ticketsByMovieDate(movieId: ID!, date: String): [Ticket]
        GetMovie(Title: String): Movie
        GetMovieYear(Title: String, Year: String): Movie
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        createMovie(Title: String): Movie
        createMovieYear(Title: String, Year: String): Movie
        login(username:String!, password: String!): User!
        createTimeslot(movieId: String, movieTitle: String, theater: Int, date: String, timeSlot: String): Timeslot
        removeTimeslot(movieId: String, date: String, timeSlot: String): Timeslot
        reserveSeats(seatReservations: SeatReservation): Timeslot
        unreserveSeats(seatReservations: SeatReservation): Timeslot
        purchaseTickets(userId: ID!, seats: [Seats]!): [Ticket]
        refundTicket(ticketId: ID!): Ticket
    }


    input SeatReservation{
        seats: [reservationElement!]!
        movieId: String!
        date: String!
        timeSlot: String!
    }

    type Timeslot{
        seating: [[timeslotSeatings!]!]!
        availableSeats: Int
        theater: Int!
        movieId: String!
        movieTitle: String!
        date: String!
        timeSlot: String!
    }

    type Ticket{
        id: ID
        userId: String!,
        movieId: String!,
        movieTitle: String!,
        date: String!,
        timeSlot: String!,
        seatRow: String!,
        seatNumber: String!
    }

    input Seats{
        movieId: ID!
        movieTitle: String!
        date: String!
        timeSlot: String!
        seatRow: String!
        seatNumber: String!

    }


    input reservationElement{
        seatRow: String
        seatNumber: String
        id: String
    } 

    type timeslotSeatings{
        row: String
        number: String
        id: String
        isReserved: Boolean
    }

`;