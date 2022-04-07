import React, {useState, useEffect } from 'react';
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Dropdown, Grid, Modal, Segment } from 'semantic-ui-react';
import '../styles/Timeslot.css'

function AdminTimeslots (props){
    const {movieId, date, deleteTimeslot} = props;
    const [open , setOpen] = useState(false);
    const [slots, setTimeslots] = useState([]);
    const [unusedSlots, setUnusedSlots] = useState([]);
    useQuery(MOVIE_TIMESLOTS, {
        fetchPolicy: 'network-only',
        variables: {movieId: movieId, date: date},
        onCompleted(data){
            setTimeslots(data.timeslotTimes.map(obj => obj.timeSlot));
        },
        onError(err){
            if(err.message.includes("GraphQL error: No timeslots found for movie:")){
                setTimeslots([]);
            }
        }
    });

    const [getTimeslots] = useLazyQuery(UNUSED_TIMESLOTS, {
        fetchPolicy: 'network-only',
        variables: {movieId: movieId, date: date},
        onCompleted(data){
            var temp = data.unusedTimeslots;
            temp = temp.map(slot => ({text: slot, key: slot, value: slot}));
            setUnusedSlots(temp);
        }
    })

    useEffect(() => {
        getTimeslots();
    }, [slots])


    return(
        <div>
            <label>{date}</label>
            <label>Click on a timeslot to delete it</label>
            <div id="Timeslot_Container">
                <Grid stackable columns={5}>
                    {slots.map((timeslot) => (
                        <Grid.Column key={timeslot} width={2}>
                            <Segment id="Timeslot_grid"onClick={() => deleteTimeslot(movieId, date, timeslot)}>{timeslot}</Segment>
                        </Grid.Column>
                    ))}
                </Grid>
            </div>
            <Modal onClose={() => setOpen(false)} 
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Add Timeslot</Button>}>

                <Modal.Header>Add a timeslot</Modal.Header>
                <Modal.Content>
                    <Dropdown placeholder ='Select date' options={unusedSlots} selection fluid></Dropdown>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button>Create</Button>
                </Modal.Actions>
            </Modal>
        </div>

    )
}

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

const UNUSED_TIMESLOTS = gql`
    query unusedTimeslots(
        $movieId: String
        $date: String
    ) {
        unusedTimeslots(
           movieId: $movieId
           date: $date
       )
    }
`


// const UNUSED_TIMESLOTS = gql`
//     query unusedTimeslots(
//         $movieId: String
//         $date: String
//     ) {
//         unusedTimeslots(
//            movieId: $movieId
//            date: $date
//        ){
//        }
//     }
// `

// const UNUSED_THEATERS = gql`
//     query timeslotTimes(
//         $movieId: String
//         $date: String
//     ) {
//        timeslotTimes(
//            movieId: $movieId
//            date: $date
//        ){
//            timeSlot
//        }
//     }
// `
export default AdminTimeslots;