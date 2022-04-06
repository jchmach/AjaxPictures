import React from 'react'
import { gql, useQuery } from '@apollo/client';
import "../styles/Movie.css";
import { Segment, Card, Header } from 'semantic-ui-react';
import MovieCard from './MovieCard';


export default function MovieCoulmn(props) {

    console.log(props.genre)

    let for_adding_in_admin = "mutation Mutation($title: String) {createMovie(Title: $title) {Title}}"

    let movie_list = null
    let variable_arg =  {variables: {}}
    let Query_arg =  GET_MOVIES
    if(props && props.genre){
        variable_arg =  {variables: {"genre": props.genre}}
        Query_arg = GET_MOVIES_GENRE
    }
    const { loading, error, data } = useQuery(Query_arg, variable_arg);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error}`;
    if(props && props.genre){
        console.log(data)
        movie_list = data.GetMoviesGenre
        console.log(movie_list[0].Poster)
    }else{
        console.log(data)
        movie_list = data.GetMovies
        console.log(movie_list[0].Poster)
    }
    const movieItems = movie_list.map((movie) =>  
        <MovieCard Title={movie.Title} Poster={movie.Poster}></MovieCard>
    );  
    return (
        <div class="ui container">
            {movieItems}
        </div>  
    )
}

const GET_MOVIES = gql `
query Query {
    GetMovies {
      Poster
      Title
      Year
    }
  }
`;

const GET_MOVIES_GENRE = gql `
query Query($genre: String) {
    GetMoviesGenre(Genre: $genre) {
      Title
      Year
      Poster
    }
  }
`;