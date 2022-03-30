import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import { useLazyQuery } from '@apollo/client';
import { useNavigate, useLocation } from "react-router-dom";
import Timeslots from "../components/Timeslots";
import MovieComponent from "../components/MovieComponent";
function MovieTimeslots(){

    const navigate = useNavigate();
    const [movieData, setData] = useState({
        movieId: "",
        date: "",
        timeslot: "",
        movieTitle: ""
    })

    const params = useLocation();

    const [navigatePurchase] = useLazyQuery(GET_SEATING, {
        fetchPolicy:'network-only',
        variables: {movieId: movieData.movieId, date: movieData.date, timeslot: movieData.timeslot},
        onCompleted(data){
            var seating = data.timeslot.seating;
            var availableSeats = data.timeslot.availableSeats;
            navigate('/purchaseticket', {
                state:{
                    movieData,
                    seating,
                    availableSeats
                }
            });
        }
    });

    useEffect(() => {
        navigatePurchase();
    }, [movieData])

    const viewSeatMap = (movieId, date, timeSlot) => {
        setData({movieId: movieId, date: date, timeslot: timeSlot, movieTitle: "The Batman"});
    }

    return(
        <div id="Purchase_Page">
            <div id="Purchase_MovieInfo">
                <MovieComponent onPurchasePage={true}  movieName="The Batman"></MovieComponent>           
            </div>
            <div id="Timeslots">
                <Timeslots movieId={params.state.movieId} viewSeatMap={viewSeatMap}></Timeslots>
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

export default MovieTimeslots;