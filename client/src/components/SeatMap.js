import React from 'react';
import SeatPicker from 'react-seat-picker';
import "../style/SeatMap.css";
import { Button } from 'semantic-ui-react'

function SeatMap(props) {

    const [availableSeats, seatData, purchase] = props;

    const [seats, setSeat] = useState([]);


    const addSeatCallback = (row, number, id) => {
        const newReservation = { seatRow: row, seatNumber: number, id: id };
        setSeat(() => [...seats, newReservation]);
    };


    const removeSeatCallback = (row, number, id) => {
        const temp = seats.filter(function (seat) {
            return !(seat.seatRow === row && seat.seatNumber === number)
        });
        setSeat(temp);
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
                removeSeatCallbac={removeSeatCallback}
                visible
                alpha />
            <Button id="SeatMap_Purchase" onClick={()=> purchase(seats)} disabled={!seats.length}></Button>
        </div>
    )


}
export default SeatMap;
