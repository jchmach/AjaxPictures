import React, {useState, useContext, useEffect} from "react";
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
    // const[seatPlan, setPicker] = useState({
    //     arrangement: [[]],
    //     availableSeats: 0
    // })
    // const [seatPlan, setPlan] = useState([[]]);
    // const [availableSeats, setVacant] = useState(0);
    const [reserveSeats] = useMutation(RESERVE_SEATS, {
        variables: {movieId: params.state.movieData.movieId, date: params.state.movieData.movieId, timelot: params.state.movieData.timeSlot, seats: selected}
    })


    const [reserveTicket] = useMutation(PURCHASE_TICKET, {
        variables: {userId: context.user, seats: selected }
    })
    // var seatPlan = [];
    // var availableSeats = 0;
    const purchase = (seats) => {
        setSeats(seats);
        reserveSeats();
        seats.map(seat => ({...seat, movieId: params.state.movieData.movieId, date: params.state.movieData.date, timeslot: params.state.movieData.timeSlot, movieTitle: params.state.movieData.movieTitle}) )
        setSeats(seats);
        reserveTicket();
        navigation("/");
    }


    // useQuery(GET_SEATING, {
    //     variables: {movieId: params.state.movieId.movieId, date: params.state.movieId.date, timeslot: params.state.movieId.timeslot},
    //     onCompleted(data){
    //         setPicker({arrangement: data.timeslot.seating, availableSeats: data.timeslot.availableSeats})
    //     },
    //     onError(){
    //         console.log(params.state.movieId);
    //         console.log(params.state.date);
    //         console.log(params.state.timeSlot);
    //     }
    // });

    // useEffect(() => {
    //     console.log(seatPlan);
    // }, [seatPlan])

    //const data = [];
    return(
        <div id="Purchase_Page">
        <div id="Purchase_MovieInfo">
            <h1>The Batman</h1>
        </div>
        <div id="Header">
            <Button onClick={goBack}>Go back</Button>
            <Label>{params.state.movieData.date}</Label>
            <Label>{params.state.movieData.timeslot}</Label>
        </div>
        <div id="Purchase_Container">
            <SeatMap seatData={params.state.seating} availableSeats={params.state.availableSeats} purchase={purchase}></SeatMap>
        </div>
    </div>
    )
}





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