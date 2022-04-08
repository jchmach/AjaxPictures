import React from 'react'
import { gql, useQuery } from '@apollo/client';

export default function MovieComponent(props) {

    const {onPurchasePage, navigateNext} = props;
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { "title": props.movieName},
    });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const movieItem = data.GetMovie

  return (
    <div className="ui segment">
    <p></p>
  <div className="ui two column very relaxed grid">
    <div className="column">
        <img className="ui fluid image" src={movieItem.Poster}></img>
    </div>
    <div className="column">
        <div className="ui divided selection list">
        <a class="item">
            <div className="red ui extra large horizontal label">Title</div>
            {movieItem.Title}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Year</div>
            {movieItem.Year}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Plot</div>
            {movieItem.Plot}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Genre</div>
            {movieItem.Genre}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Director</div>
            {movieItem.Director}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Runtime</div>
            {movieItem.Runtime}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Released</div>
            {movieItem.Released}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Language</div>
            {movieItem.Language}
        </a>
        <a class="item">
            <div className="red ui horizontal label">Country</div>
            {movieItem.Country}
        </a>
        <a class="item">
            <div className="yellow ui horizontal label">imdb</div>
            {movieItem.imdb}
        </a>
        <a class="item">
            <div className="yellow ui horizontal label">Meta Score</div>
            {movieItem.MetaScore}
        </a>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <div>
        <iframe width="520" height="340"
            src= {movieItem.trailerUrl}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
        />{" "}
        </div>
        {onPurchasePage? null : <button className="blue massive ui button" onClick={() => navigateNext(movieItem.id, movieItem.Title)}>
                                    Buy Ticket
                                </button>}

        </div>
        </div>
    </div>
    <div className="ui vertical divider">
    </div>
    </div>
  )
}

const GET_MOVIE = gql `
    query GetMovie($title: String) {
        GetMovie(Title: $title) {
        id
        Title
        Year
        Genre
        Plot
        Director
        Runtime
        Released
        Language
        Country
        imdb
        Poster
        MetaScore
        trailerUrl
        }
  }
`;