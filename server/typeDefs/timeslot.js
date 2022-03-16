import gql from 'apollo-server-express'
export default gql `
    extend type Query {
        timeslot(movieId: String, date: String, timeSlot: String ): Timeslot
        timeslotTimes(movieId: String, date: String): [Timeslot!]!
        timeslotDates(movieId: String): [Timeslot!]!
    }

    extend type Mutation{
        createTimeslot(movieId: String, movieTitle: String, theater: Number, date: String, timeSlot: String): Timeslot
        removeTimeslot(movieId: String, date: String, timeSlot: String): Timeslot
        reserveSeats(seats: [[{row: String, number: String, id: String}!]!]!, movieId: String, date: String, timeSlot: String): Timeslot
        unreserveSeats(seats: [[{row: String, number: String, id: String, isReserved: Boolean}!]!]!, movieId: String, date: String, timeSlot: String): Timeslot
    }

    type Timeslot{
        seating: [{row: String, number: String, id: String, isReserved: Boolean}!]!
        availableSeats: Number
        theater: Number!
        movieId: String!
        movieTitle: String!
        date: String!
        timeslot: String!
    }
`