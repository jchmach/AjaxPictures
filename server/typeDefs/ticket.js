import gql from 'apollo-server-express'
export default gql `
    extend type Query {
        ticket(userId: userId!): [Ticket!]!
    }

    type Ticket{
        
    }
`