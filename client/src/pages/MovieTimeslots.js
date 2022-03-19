import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Timeslots from "../components/Timeslots";
function MovieTimeslots(){

    const navigate = useNavigate();
    const [movieData, setData] = useState({
        movieId: "",
        date: "",
        timeslot: "",
        movieTitle: "The Batman"
    })
    const [navigatePurchase] = useLazyQuery(GET_SEATING, {
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
        setData({movieId: movieId, date: date, timeslot: timeSlot});
    }

    return(
        <div id="Purchase_Page">
            <div id="Purchase_MovieInfo">
                <h1>The Batman</h1>
            </div>
            <div id="Timeslots">
                <Timeslots movieId="The Batman" viewSeatMap={viewSeatMap}></Timeslots>
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