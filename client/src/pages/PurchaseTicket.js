import React, {useState, useContext} from "react";
import gql from "graphql-tag";
import {useMutation, useQuery} from '@apollo/react-hooks'
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
    // const [seatPlan, setPlan] = useState([[]]);
    // const [availableSeats, setVacant] = useState(0);
    const [reserveSeats] = useMutation(RESERVE_SEATS, {
        variables: {movieId: params.state.movieId, date: params.state.movieId, timelot: params.state.timeSlot, seats: selected}
    })


    const [reserveTicket] = useMutation(PURCHASE_TICKET, {
        variables: {userId: context.user, seats: selected }
    })
    var seatPlan = [];
    var availableSeats = 0;
    const purchase = (seats) => {
        setSeats(seats);
        reserveSeats();
        seats.map(seat => ({...seat, movieId: params.state.movieId, date: params.state.date, timeslot: params.state.timeSlot, movieTitle: params.state.movieTitle}) )
        setSeats(seats);
        reserveTicket();
        navigation("/");
    }


    useQuery(GET_SEATING, {
        variables: {movieId: params.state.movieId.movieId, date: params.state.movieId.date, timeslot: params.state.movieId.timeslot},
        onCompleted(data){
            availableSeats = data.timeslot.availableSeats;
            seatPlan = data.timeslot.seating;
        },
        onError(){
            console.log(params.state.movieId);
            console.log(params.state.date);
            console.log(params.state.timeSlot);
        }
    });

    //const data = [];
    return(
        <div id="Purchase_Page">
        <div id="Purchase_MovieInfo">
            <h1>The Batman</h1>
        </div>
        <div id="Header">
            <Button onClick={goBack}>Go back</Button>
            <Label>{params.state.movieId.date}</Label>
            <Label>{params.state.movieId.timeslot}</Label>
        </div>
        <div id="Purchase_Container">
            <SeatMap seatData={seatPlan} availableSeats={availableSeats} purchase={purchase}></SeatMap>
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
           movieId: $movieId
           date: $date
           timeSlot: $timeslot
       ){
           seating{
               row
               number
               id
               isReserved
           }
           availableSeats
       }
    }
`


const RESERVE_SEATS = gql`
    mutation reserveSeats(
        $seats: [reservationElement!]!
        $movieId: String!
        $date: String!
        $timeslot: String!
    ) {
        reserveSeats(
            seatReservations: {
                seats: $seats
                movieId: $movieId
                date: $date
                timeSlot: $timeslot
            }
        )
    }

`

const PURCHASE_TICKET = gql`
    mutation purchaseTickets(
        $userId: String
        $seats: [Seats!]!
    ) {
        purchaseTickets(
            userId: $userId
            seats: $seats
        )
    }

`

export default PurchaseTicket;