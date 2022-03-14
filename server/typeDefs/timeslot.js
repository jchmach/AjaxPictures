import gql from 'apollo-server-express'
export default gql `
    extend type Query {
        timeslot(movieId: String, date: String, timeSlot: String ): Timeslot
        timeslotTimes(movieId: String, date: String): [Timeslot!]!
        timeslotDates(movieId: String): [Timeslot!]!
    }

    extend type Mutation{
        createTimeslot(movieId: String, date: String, timeSlot: String): Timeslot
        removeTimeslot(movieId: String, date: String, timeSlot: String): Timeslot
        reserveSeats(seating: [{row: String, number: String, id: String, isReserved: Boolean}!]!): Timeslot
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