import { Button, Popup } from "semantic-ui-react";
import Calendar from 'react-calendar'
import { useState } from "react";
import gql from "graphql-tag";
import { useNavigate } from "react-router";
import {useQuery, useMutation} from '@apollo/client'
import AdminTimeslots from "./AdminTimeslots";
import '../styles/AdminMovieComp.css'
import 'react-calendar/dist/Calendar.css'
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
            <div id="Movie_Info_Container">
                <img src={movie.Poster}></img>
                <div id="Movie_Info">
                    <div className="Movie_Label">
                        <label className="Movie_Header">{movie.Title}</label>
                        <label className="Movie_Header"> ({year})</label>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">Director</label>
                        <label className="Movie_Label_Content">{movie.Director}</label>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">Plot</label>
                        <div id="Movie_Plot_Container">
                            <label className="Movie_Label_Content">{movie.Plot}</label>
                        </div>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">Genre</label>
                        <label className="Movie_Label_Content">{movie.Genre}</label>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">Released</label>
                        <label className="Movie_Label_Content">{movie.Released}</label>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">Language</label>
                        <label className="Movie_Label_Content">{movie.Language}</label>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">Runtime</label>
                        <label className="Movie_Label_Content">{movie.Runtime}</label>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">IMDB Score</label>
                        <label className="Movie_Label_Content">{movie.imdb}</label>
                    </div>
                    <div className="Movie_Label">
                        <label className="Movie_Label_Title">Metacritic Score</label>
                        <label className="Movie_Label_Content">{movie.MetaScore}</label>
                    </div>
                </div>
            </div>
            <div id="Admin_Actions">
                <Button id="Go_Back" onClick={goBack}>Back</Button>
                <Button id="Delete_Movie" onClick={deleteMovie}>Delete Movie</Button>
                <Popup trigger={<Button id="Add_Movie">Add Date</Button>} flowing hoverable>
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