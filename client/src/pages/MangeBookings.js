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
                        <Grid.Column >
                            <Label color="red">
                                {ticket.date}
                            </Label>
                        </Grid.Column>
                        <Grid.Column >
                            <Label color="red">
                                {ticket.timeSlot}
                            </Label>
                        </Grid.Column>
                        <Grid.Column >
                            <Label color="green">
                                {ticket.seatRow}
                            </Label>
                        </Grid.Column>
                        <Grid.Column >
                            <Label color="green">
                                {ticket.seatNumber}
                            </Label>
                        </Grid.Column>
                        <Grid.Column >
                            <Button color="instagram" onClick={() => {refund({variables: {ticketId: ticket.id}}); window.location.reload();}}>
                                Refund Ticket
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

export default ManageBookings;