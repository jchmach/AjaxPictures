import React, {useState} from 'react';
import SeatPicker from 'react-seat-picker';
import "../styles/SeatMap.css";
import { Button } from 'semantic-ui-react'

function SeatMap(props) {

    const {availableSeats, seatData, purchase} = props;

    const [seats, setSeat] = useState([]);


    const addSeatCallback = ({row, number, id}, addCb) => {
        const newReservation = { seatRow: row, seatNumber: number, id: id };
        setSeat(() => [...seats, newReservation]);
        addCb(row, number, id);
    };


    const removeSeatCallback = ({row, number}, removeCb) => {
        const temp = seats.filter(function (seat) {
            return !(seat.seatRow === row && seat.seatNumber === number)
        });
        setSeat(temp);
        removeCb(row, number);
    }



    return (
        <div className="SeatMap_Container">
            <h1 id="SeatMap_Title">Seat Map</h1>
            <div id="Screen">Screen</div>
            <SeatPicker
                maxReservableSeats={availableSeats}
                id="SeatMap"
                rows={seatData}
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
                visible
                alpha />
            <Button id="SeatMap_Purchase" onClick={()=> purchase(seats)} disabled={!seats.length}>Purchase Tickets</Button>
        </div>
    )


}
export default SeatMap;
