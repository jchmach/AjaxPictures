import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import {AuthContext} from '../context/auth'
import {Grid, Label, Button, Header, Divider} from 'semantic-ui-react'

function ManageBookings(){
    const context = useContext(AuthContext);
    const { loading, error, data} = useQuery(GET_SEATING, {
        variables: {userId: context.user.id}
    })

    const [refund] = useMutation(DELETE_TICKET);
    const [unreserve] = useMutation(DELETE_TIMESLOT, {
        onError(err){
            console.log(

                "afsasfafaa"
            )
            console.log(this.variables)
            console.log(err);
        }
    }
        );

    if (error) return (
        console.log(error)
    )
    
    if (loading) return 'Loading...';

    if (error) return (
        <Header textAlign="center" size="huge">
            No Bookings Found
        </Header>
    )
    
    return(
        <div>
            <Header textAlign="center" size="huge">
                Your Bookings
            </Header>
            <Divider horizontal>
                *
            </Divider>
            <Grid relaxed container={true} divided={"vertically"}>
                {data.ticketHistory.map(ticket => (
                    <Grid.Row columns={6} >
                        <Grid.Column>
                            <Label color="blue">
                                {ticket.movieTitle}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="red">
                                {ticket.date}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="red">
                                {ticket.timeSlot}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="green">
                                {ticket.seatRow}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="green">
                                {ticket.seatNumber}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Button color="instagram" onClick={() => {
                                console.log([{seatRow: ticket.seatRow,seatNumber: ticket.seatNumber, id: ticket.seatRow + ticket.seatNumber}])
                                let variables = {movieId: ticket.movieId, date: ticket.date, timeslot: ticket.timeSlot, seats: [{seatRow: ticket.seatRow,seatNumber: ticket.seatNumber, id: ticket.seatRow.toLowerCase() + ticket.seatNumber}]}
                                console.log(variables);
                                unreserve({variables: variables}); 
                                refund({variables: {ticketId: ticket.id}});                                 
                                }}>
                                Refund Ticket
                                {console.log(ticket.date)}
                            </Button>
                        </Grid.Column> 
                    </Grid.Row>  
                ))}
            </Grid>
        </div>
    )
}

const GET_SEATING = gql`
    query ticketHistory(
        $userId: String!
    ) {
       ticketHistory(
           userId: $userId
       ){
            id
            userId
            movieId
            movieTitle
            date
            timeSlot
            seatRow
            seatNumber
       }
    }
`

const DELETE_TICKET = gql`
    mutation refundTicket(
        $ticketId: ID!
    ) {
        refundTicket(
            ticketId: $ticketId
        ){
            id
        }
    }
`

const DELETE_TIMESLOT = gql`
    mutation unreserveSeats(
        $seats: [reservationElement!]!
        $movieId: String!
        $date: String!
        $timeslot: String!
    ) {
        unreserveSeats(
            seatReservations:{
                seats: $seats
                movieId: $movieId
                date: $date
                timeSlot: $timeslot
            }
        ){
            availableSeats
        }
    }
`

export default ManageBookings;