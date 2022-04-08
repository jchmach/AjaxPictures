import React from 'react'
import "../styles/Movie.css";

export default function MovieCard(props) {
  return (
        <a href={`/Movie/${props.Title}`}>
            <div class="ui card">
                <div className="image">
                    <img src={props.Poster}></img>
                </div>
            </div> 
        </a>
  )
}