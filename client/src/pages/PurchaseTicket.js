import React, {useState, useContext, useEffect} from "react";
import gql from "graphql-tag";
import {useMutation, useQuery} from '@apollo/react-hooks'
import { useNavigate, useLocation } from "react-router-dom";
import SeatMap from "../components/SeatMap";
import { Button, Label } from "semantic-ui-react";
import { AuthContext } from '../context/auth'
import '../styles/PurchaseStyles.css'
import MovieComponent from "../components/MovieComponent";



function PurchaseTicket(){
    const params = useLocation();
    const navigation = useNavigate();
    const goBack = () => {
        navigation(-1);
    }
    
    const context = useContext(AuthContext);

    const [selected, setSeats] = useState([]);
    const [tickets, setTicket] = useState([]);
    const [reserveSeats] = useMutation(RESERVE_SEATS, {
        variables: {movieId: params.state.movieData.movieId, date: params.state.movieData.date, timeslot: params.state.movieData.timeslot, seats: selected},
        onCompleted(){
            var temp = selected.map(seat => ({...seat, movieId: params.state.movieData.movieId, date: params.state.movieData.date, timeSlot: params.state.movieData.timeslot, movieTitle: params.state.movieData.movieTitle}) );
            temp = temp.map(({id, ...rest}) => rest);
            setTicket(temp);
        }
    })


    const [reserveTicket] = useMutation(PURCHASE_TICKET, {
        variables: {userId: context.user.id, seats: tickets },
        onCompleted(){
            navigation("/");
        }
    })

    const purchase = (seats) => {
        setSeats(seats);
    }

    useEffect(()=>{
        if(selected.length != 0){
            reserveSeats();
        }
    }, [selected])

    useEffect(() => {
        if(tickets.length != 0){
            reserveTicket();
        }
    }, [tickets])

    return(
        <div id="Purchase_Page">
        <div id="Purchase_MovieInfo">
            <MovieComponent onPurchasePage={true}  movieName="The Batman"></MovieComponent>           

        </div>
        <div id="Header">
            <Button id="Purchase_Return" onClick={goBack}>Back</Button>
            <Label className="Purchase_TimeslotInfo">{params.state.movieData.date}</Label>
            <Label className="Purchase_TimeslotInfo">{params.state.movieData.timeslot}</Label>

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
        ){
            availableSeats
        }
    }
    

`

const PURCHASE_TICKET = gql`
    mutation purchaseTickets(
        $userId: ID!
        $seats: [Seats]!
    ) {
        purchaseTickets(
            userId: $userId
            seats: $seats
        )
        {
            id
            movieId
            movieTitle
            timeSlot
            date
            seatRow
            seatNumber
            userId
        }
    }

`

export default PurchaseTicket;