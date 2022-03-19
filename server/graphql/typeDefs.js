const { gql } = require('apollo-server');

module.exports = gql`

    type User{
        id:ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        sayHi:String
        timeslot(movieId: String, date: String, timeSlot: String ): Timeslot
        timeslotTimes(movieId: String, date: String): [Timeslot]
        timeslotDates(movieId: String): [Timeslot]
        ticketHistory(userId: ID!): [Ticket]
        ticketsByMovie(movieId: ID!): [Ticket]
        ticketsByDate(date: String): [Ticket]
        ticketsByMovieDate(movieId: ID!, date: String): [Ticket]
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username:String!, password: String!): User!
        createTimeslot(movieId: String, movieTitle: String, theater: Int, date: String, timeSlot: String): Timeslot
        removeTimeslot(movieId: String, date: String, timeSlot: String): Timeslot
        reserveSeats(seatReservations: SeatReservation): Timeslot
        unreserveSeats(seatReservations: SeatReservation): Timeslot
        purchaseTickets(userId: ID!, seats: [Seats]!): Ticket
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
        id: ID!
        userId: String!,
        movieId: String!,
        movieTitle: String!,
        date: String!,
        timeSlot: String!,
        seatRow: String!,
        seatNumber: Int!
    }

    input Seats{
        movieId: ID!
        movieTitle: String!
        date: String!
        timeSlot: String!
        seatRow: String!
        seatNumber: Int!

    }


    input reservationElement{
        row: String
        number: Int
        id: String
    } 

    type timeslotSeatings{
        row: String
        number: String
        id: String
        isReserved: Boolean
    }

`;