import React from 'react';
import "../styles/MovieListItem.css";
import { useMutation } from '@apollo/client';
import {Button} from 'semantic-ui-react'
import gql from 'graphql-tag';

function MovieListItem(props){
    const {poster, title, year, existing, clickMovie, movieId, refreshList} = props

    const [deleteMovieDB] = useMutation(DELETE_MOVIE, {
        variables: {id: movieId},
        onCompleted(){
            refreshList(movieId)
        }
    })

    const  deleteMovie = (event) => {
        event.stopPropagation();
        deleteMovieDB()
    }
    const click = () =>{
        clickMovie(title, year);
    }
    return(
        <div className="Movie_Item" onClick={click}>
            <div>
                <img id="Poster" src={poster}></img>
            </div>
            <div className="Movie_Info_Container">
                <label className="Movie_Info">{title}</label>
                <label className="Movie_Info Movie_Info_Year">({year})</label>
                {existing? <Button id="Delete_Movie"onClick={deleteMovie}>Delete</Button> : null}
            </div>
        </div>
    )
}

export default MovieListItem;

const DELETE_MOVIE = gql`
    mutation removeMovie(
        $id: String
    ) {
        removeMovie(
            movieId: $id
        )
    }
`