import React, {useState, useEffect } from 'react';
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from '@apollo/client';
import { Grid, Dropdown, Segment } from 'semantic-ui-react';
import '../styles/Timeslot.css'

function Timeslots (props){
    const {movieId, viewSeatMap} = props;
    const [date, setDate] = useState("")

    const [dropdownOpts, setOptions] = useState([]);
    const [slots, setTimeslots] = useState([]);
    useQuery(MOVIE_DATES, {
        fetchPolicy: 'network-only',
        variables: {movieId: movieId},
        onCompleted(data){
            var unique = [...new Set(data.timeslotDates.map(obj => obj.date))];
            var temp = unique.map(date => ({text: date, key: date, value: date}));
            setOptions(temp);
        }
    });

    const [getTimeslots] = useLazyQuery(MOVIE_TIMESLOTS, {
        fetchPolicy: 'network-only',
        variables: {movieId: movieId, date: date},
        onCompleted(data) {
            setTimeslots(data.timeslotTimes.map(obj => obj.timeSlot));
        },
        onError(err){
            console.log(err.message);
        }
    });

    useEffect(() => {
        getTimeslots();
    }, [date])


    const switchDate = (err, dropdown) => {
        setDate(dropdown.value);
    }

    return(
        <div id="Timeslot_Container">
            <Dropdown placeholder ='Select date' options={dropdownOpts} onChange={switchDate} selection fluid></Dropdown>
            <Grid stackable columns={5}>
                {slots.map((timeslot) => (
                    <Grid.Column key={timeslot} width={2}>
                        <Segment id="Timeslot_grid"onClick={() => viewSeatMap(movieId, date, timeslot)}>{timeslot}</Segment>
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
    

}

const MOVIE_DATES = gql`
    query timeslotDates(
        $movieId: String
    ) {
       timeslotDates(
           movieId: $movieId
       ){
            date
       }
    }
`


const MOVIE_TIMESLOTS = gql`
    query timeslotTimes(
        $movieId: String
        $date: String
    ) {
       timeslotTimes(
           movieId: $movieId
           date: $date
       ){
           timeSlot
       }
    }
`

export default Timeslots;