import React from 'react';
import SeatPicker from 'react-seat-picker';
import "../style/SeatMap.css";

class SeatMap extends React.Component{

    constructor(props){
        super(props)
    }

    state = {
        loading: false
    };
   
      render(){
        return (
            <div className="SeatMap_Container">
                <h1 id="SeatMap_Title">Seat Map</h1>
                <div id="Screen">Screen</div>
                <SeatPicker 
                    maxReservableSeats={this.props.availableSeats} 
                    id="SeatMap" 
                    rows = {this.props.seatData} 
                    visible 
                    alpha/>
            </div>
        )
      }

}
export default SeatMap;
