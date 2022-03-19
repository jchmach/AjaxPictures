import React from "react";
import { useNavigate } from "react-router-dom";
import Timeslots from "../components/Timeslots";
function MovieTimeslots(){

    const navigate = useNavigate();
    navigate()
    const viewSeatMap = (movieId, date, timeSlot) => {
        navigate('/PurchaseTicket', {
            state:{
                movieId,
                date,
                timeSlot
            }
        });
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

export default MovieTimeslots;