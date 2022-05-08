import React from 'react'
import { gql, useQuery } from '@apollo/client';
import "../styles/Movie.css";
import { Segment, Card, Header } from 'semantic-ui-react';
import MovieCard from '../components/MovieCard';
import "../styles/Movie.css";

export default function Movies() {
    let movie_list = null
    let variable_arg =  {variables: {}}
    let Query_arg =  GET_MOVIES
    const { loading, error, data } = useQuery(Query_arg, variable_arg);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error}`;
    console.log(data)
    movie_list = data.GetMovies
    console.log(movie_list[0].Poster)
    const movieItems = movie_list.map((movie) =>  
        <a href={`/Movie/${movie.Title}`}>
            <div class="ui card">
                <div className="image">
                    <img src={movie.Poster}></img>
                </div>
            </div> 
        </a>
    );  
    return (
        <div class="ui two column centered grid MovieList">
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