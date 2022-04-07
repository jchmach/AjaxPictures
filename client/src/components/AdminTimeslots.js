import React, {useState, useEffect } from 'react';
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { Button, Dropdown, Grid, Modal, Segment } from 'semantic-ui-react';
import '../styles/AdminTimeslot.css'

function AdminTimeslots (props){
    const {movieId, movieTitle, date} = props;
    const [open , setOpen] = useState(false);
    const [slots, setTimeslots] = useState([]);
    const [unusedSlots, setUnusedSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [unusedTheaters, setUnusedTheaters] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [toTimeslotDelete, setTimeslotDelete] = useState("");

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

    const [getUsedTimeslots] = useLazyQuery(MOVIE_TIMESLOTS, {
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

    const [getTheaters] = useLazyQuery(UNUSED_THEATERS, {
        fetchPolicy: 'network-only',
        variables: {date: date, timeslot: selectedSlot },
        onCompleted(data){
            var temp = data.unusedTheaters;
            temp = temp.map(theater => ({text: theater, key: theater, value: theater}));
            setUnusedTheaters(temp);
        }
    })

    const [createTimeslotDB] = useMutation(CREATE_TIMESLOT, {
        variables: {movieId: movieId, movieTitle: movieTitle, date: date, timeslot: selectedSlot, theater: selectedTheater},
        onCompleted(){
            getUsedTimeslots();
        }
    })

    const [deleteTimeslotDB] = useMutation(DELETE_TIMESLOT, {
        variables: {movieId: movieId, date: date, timeslot: toTimeslotDelete},
        onCompleted(){
            getUsedTimeslots();
        },
        onError(err){
            console.log(err);
        }
    })

    const [deleteDateDB] = useMutation(DELETE_DATE, {
        variables: {movieId: movieId, date: date},
        onCompleted(){
            getUsedTimeslots();
        },
        onError(err){
            console.log(err);
        }
    })

    useEffect(() => {
        getTimeslots();
    }, [slots])

    useEffect(() => {
        getTheaters();
    }, [selectedSlot])

    useEffect(() => {
        deleteTimeslotDB();
    }, [toTimeslotDelete])

    const changeSlot = (err, dropdown) =>{
        setSelectedSlot(dropdown.value);
    }
    const changeTheater = (err, dropdown) =>{
        setSelectedTheater(dropdown.value)
    }

    const createTimeslot = (data) => {
        createTimeslotDB();
        setOpen(false);
    }

    const deleteTimeslot = (timeslot) => {
        setTimeslotDelete(timeslot);
    }


    return(
        <div>
            <label>{date}</label>
            <label>Click on a timeslot to delete it</label>
            <Button onClick={deleteDateDB}>Delete All Timeslots</Button>
            <div id="Timeslot_Container">
                <Grid stackable columns={5}>
                    {slots.map((timeslot) => (
                        <Grid.Column key={timeslot} width={2}>
                            <Segment id="Admin_Timeslot_grid"onClick={() => deleteTimeslot(timeslot)}>{timeslot}</Segment>
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
                    <Dropdown placeholder ='Select date' options={unusedSlots} onChange={changeSlot} selection fluid></Dropdown>
                    <Dropdown disabled={!selectedSlot.length} options={unusedTheaters} onChange={changeTheater} selection fluid></Dropdown>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button disabled={!selectedTheater} onClick={createTimeslot}>Create</Button>
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

const UNUSED_THEATERS = gql`
    query unusedTheaters(
        $timeslot: String
        $date: String
    ) {
        unusedTheaters(
           timeslot: $timeslot
           date: $date
       )
    }
`
const CREATE_TIMESLOT = gql`
    mutation createTimeslot(
        $timeslot: String
        $date: String
        $movieId: String
        $movieTitle: String
        $theater: Int
    ) {
        createTimeslot(
           timeSlot: $timeslot
           date: $date
           movieId: $movieId
           theater: $theater
           movieTitle: $movieTitle
       ){
           availableSeats
       }
    }
`
const DELETE_TIMESLOT = gql`
    mutation removeTimeslot(
        $timeslot: String
        $date: String
        $movieId: String
    ) {
        removeTimeslot(
           timeSlot: $timeslot
           date: $date
           movieId: $movieId
       ){
           availableSeats
       }
    }
`

const DELETE_DATE = gql`
    mutation removeDate(
        $movieId: String
        $date: String
    ) {
        removeDate(
            date: $date
            movieId: $movieId
        )
    }
`
export default AdminTimeslots;