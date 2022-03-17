import React from 'react';
import gql from "graphql-tag";
import {useMutation, useQuery} from '@apollo/react-hooks'
import { Grid, Dropdown, Segment } from 'semantic-ui-react';
import Timeslot from '../../../server/models/Timeslot';

function Timeslots (props){

    const {movieId, viewSeatMap} = props;
    const [date, setDates] = useState({
        date: ""
    })
    const [{loading, error, data}] = useQuery(MOVIE_DATES, {
        variables: {movieId}
    });

    const dropdownOpts = data.map(({date}) => ({text: date, key: date, value: date}));


    const [getTimeslots, {loading, error, slots}] = useQuery(MOVIE_TIMESLOTS, {
        variables: {movieId, date}
    });


    const switchDate = (err, dropdown) => {
        setDates(date, dropdown.value);
        getTimeslots();
    }

    return(
        <div id="Timeslot_Container">
            <Dropdown placeholder ='Select date' options={dropdownOpts} onChange={switchDate} selection fluid></Dropdown>
            <Grid stackable columns={5}>
                {slots.map((timeslot) => (
                    <Grid.Column key={timeslot} >
                        <Segment onClick={() => viewSeatMap({movieId, date, timeslot})}>{timeslot}</Segment>
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
           movieId: $id
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
           movieId: $id
           date: $date
       ){
           timeslot
       }
    }
`

export default Timeslots;