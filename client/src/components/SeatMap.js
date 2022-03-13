import React from 'react';
import SeatPicker from 'react-seat-picker';
import "../style/SeatMap.css";

export function SeatMap(props){
    const {seatData} = props;
    return (
        <div className="SeatMap_Container">
            <header>
                <a href="/" id="SeatMap_Title">Seat Map</a>
            </header>
            <div id="Screen">Screen</div>
            <SeatPicker id="SeatMap" rows = {seatData} visible/>
        </div>
    )
}