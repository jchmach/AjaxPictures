import { Button, Popup } from "semantic-ui-react";
import Calendar from 'react-calendar'
import { useState } from "react";
import gql from "graphql-tag";
import { useNavigate } from "react-router";
import {useQuery, useMutation} from '@apollo/client'
import AdminTimeslots from "./AdminTimeslots";

function AdminMovieComp(props){
    const navigation = useNavigate()
    const{title, year} = props;
    const [movie, setMovie] = useState({});
    const [date, setDate] = useState("");
    const [dateSelected, setSelected] = useState(false);

    const [deleteMovieDB] = useMutation(DELETE_MOVIE, {
        variables: {id: movie.ID},
        onCompleted(){
            goBack()
        }
    })

    const goBack = () => {
        navigation(-1);
    }

    useQuery(LOCAL_MOVIE, {
        variables: {movieTitle: title, year: year},
        onCompleted(data){
            setMovie({
                Title: data.GetMovieYear.Title,
                Poster: data.GetMovieYear.Poster,
                Director: data.GetMovieYear.Director,
                Plot: data.GetMovieYear.Plot,
                Genre: data.GetMovieYear.Genre,
                Released: data.GetMovieYear.Released,
                Language: data.GetMovieYear.Language,
                Runtime: data.GetMovieYear.Runtime,
                imdb: data.GetMovieYear.imdb,
                MetaScore: data.GetMovieYear.MetaScore,
                ID: data.GetMovieYear.id
            })
        }
    })

    const options = {year: 'numeric', month:"long", day: 'numeric'};
    const calendarClick = (data) => {
        setDate(data.toLocaleDateString("en-CA", options));
        setSelected(true);
    }
    const today = new Date();
    const twoWeeks = new Date();
    twoWeeks.setDate(twoWeeks.getDate() + 14)

    const deleteMovie = () => {
        deleteMovieDB()
    }

    return (
        <div>
        <img src={movie.Poster}></img>
        <div>
            <div>
                <label>{movie.Title}</label>
                <label>{movie.Year}</label>
            </div>
            <div>
                <label>Director</label>
                <label>{movie.Director}</label>
            </div>
            <div>
                <label>Plot</label>
                <label>{movie.Plot}</label>
            </div>
            <div>
                <label>Genre</label>
                <label>{movie.Genre}</label>
            </div>
            <div>
                <label>Released</label>
                <label>{movie.Released}</label>
            </div>
            <div>
                <label>Language</label>
                <label>{movie.Language}</label>
            </div>
            <div>
                <label>Runtime</label>
                <label>{movie.Runtime}</label>
            </div>
            <div>
                <label>IMDB Score</label>
                <label>{movie.imdb}</label>
            </div>
            <div>
                <label>Metacritic Score</label>
                <label>{movie.MetaScore}</label>
            </div>
            <Button onClick={goBack}>Back</Button>
            <Button onClick={deleteMovie}>Delete</Button>
            <Popup trigger={<Button>Add</Button>} flowing hoverable>
                <Calendar minDate={today} maxDate={twoWeeks} onClickDay={calendarClick}> </Calendar>
            </Popup>
            {dateSelected? <AdminTimeslots movieId={movie.ID}  movieTitle={movie.Title} date={date}></AdminTimeslots> : null}
        </div>
    </div>
    )

}
export default AdminMovieComp;


const LOCAL_MOVIE = gql`
    query GetMovieYear(
        $movieTitle: String
        $year: String
    ) {
        GetMovieYear(
            Title: $movieTitle
            Year: $year
        ){
            Title
            Year
            id
            Plot
            Genre
            Runtime
            Director
            Released
            Language
            Country
            Poster
            imdb
            MetaScore
        }
    }
`

const DELETE_MOVIE = gql`
    mutation removeMovie(
        $id: String
    ) {
        removeMovie(
            movieId: $id
        )
    }
`