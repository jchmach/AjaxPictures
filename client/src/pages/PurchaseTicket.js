import React, {useState, useContext} from "react";
import gql from "graphql-tag";
import {useMutation} from '@apollo/react-hooks'
import { useNavigate, useLocation } from "react-router-dom";
import SeatMap from "../components/SeatMap";
import { Button, Label } from "semantic-ui-react";
import { AuthContext } from '../context/auth'




function PurchaseTicket(){
    const params = useLocation();
    const navigation = useNavigate();
    const goBack = () => {
        navigation(-1);
    }
    
    const context = useContext(AuthContext);


    const [selected, setSeats] = useState([]);

    const [reserveSeats] = useMutation(RESERVE_SEATS, {
        variables: {movieId: params.state.movieId, date: params.state.movieId, timeslot: params.state.timeslot, seats: selected}
    })


    const [reserveTicket] = useMutation(PURCHASE_TICKET, {
        variables: {userId: context.user, seats: selected }
    })

    const purchase = (seats) => {
        setSeats(seats);
        reserveSeats();
        seats.map(seat => ({...seat, movieId: params.state.movieId, date: params.state.date, timeSlot: params.state.timeslot, movieTitle: params.state.movieTitle}) )
        setSeats(seats);
        reserveTicket();
        navigation("/");
    }


    const [{loading, error, data}] = useQuery(GET_SEATING, {
        variables: {movieId: params.state.movieId, date: params.state.date, timeslot: params.state.timeslot}
    });

    return(
        <div id="Purchase_Page">
        <div id="Purchase_MovieInfo">
            <h1>The Batman</h1>
        </div>
        <div id="Header">
            <Button onClick={goBack}></Button>
            <Label>{date}</Label>
            <Label>{timeslot}</Label>
        </div>
        <div id="Purchase_Container">
            <SeatMap seatData={data.seating} availableSeats={data.availableSeats} purchase={purchase}></SeatMap>
        </div>
    </div>
    )
}


const GET_SEATING = gql`
    query timeslot(
        $movieId: String
        $date: String
        $timeslot: String
    ) {
       timeslot(
           movieId: $id
           date: $date
           timeslot: $timeslot
       ){
           seating
           availableSeats
       }
    }
`


const RESERVE_SEATS = gql`
    mutation reserveSeats(
        $seats: [{row: String, number: Number, id: String}!]!
        $movieId: String!
        $date: String!
        $timeslot: String!
    ) {
        reserveSeats(
            seatReservations: {
                seats: $seats
                movieId: $movieId
                date: $date
                timeslot: $timeslot
            }
        )
    }

`

const PURCHASE_TICKET = gql`
    mutation purchaseTickets(
        $userId: String
        $seats: [{movieId: String, date: String, timeSlot: String, seatRow: String, seatNumber: Number}!]!
    ) {
        purchaseTickets(
            userId: $userId
            seats: $seats
        )
    }

`

export default PurchaseTicket;