import React from 'react'
import { useEffect,useState } from "react";
import axios from "axios";

export default function Movie() {

  const [movieName , setNameMovie ] = useState("");
  const [movieItem , setMovieItem ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const movie = await axios.get("https://www.omdbapi.com/?t=" 
                                + movieName
                                + "&apikey=362bd303", {
    })
    console.log(movie)
    setMovieItem(movie.data)
    console.log(movieItem)
  }
  useEffect(() => {
    console.log(movieItem)
  }, [movieItem])
  
  return (
    <div className="ui segment">
    <div className="ui fluid action input">
        <input 
            type="text"
            placeholder="Search..."
            onChange={e=>setNameMovie(e.target.value)}
        ></input>
    <div className="ui button" onClick={handleSubmit}>Search</div>
    </div>
    <p></p>
  <div className="ui two column very relaxed grid">
    <div className="column">
        <img className="ui fluid image" src={movieItem.Poster}></img>
    </div>
    <div className="column">
        <div class="ui divided selection list">
        <a class="item">
            <div class="red ui extra large horizontal label">Title</div>
            {movieItem.Title}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Year</div>
            {movieItem.Year}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Plot</div>
            {movieItem.Plot}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Genre</div>
            {movieItem.Genre}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Director</div>
            {movieItem.Director}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Runtime</div>
            {movieItem.Runtime}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Released</div>
            {movieItem.Released}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Language</div>
            {movieItem.Language}
        </a>
        <a class="item">
            <div class="red ui horizontal label">Country</div>
            {movieItem.Country}
        </a>
        <a class="item">
            <div class="yellow ui horizontal label">imdb</div>
            {movieItem.imdbRating}
        </a>
        <a class="item">
            <div class="yellow ui horizontal label">Meta Score</div>
            {movieItem.Metascore}
        </a>
        </div>
    </div>
  </div>
  <div className="ui vertical divider">
  </div>
</div>
  )
}
