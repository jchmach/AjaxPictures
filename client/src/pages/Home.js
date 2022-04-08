import React, { useState, useContext } from "react";
import MovieCoulmn from "../components/MovieColumn";
import {AuthContext} from '../context/auth'

function Home(){
    const context = useContext(AuthContext);
    let genre = ""
    if (context.user){
        genre = context.user.preferredGenre1
        console.log(genre)
    }
    const homePage = context.user ? (
        <div>
            <h1 class="ui header">Suggested Movies</h1>
            <h1>
                <MovieCoulmn genre={genre}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Comedy</h1>
            <h1>
                <MovieCoulmn genre={"Comedy"}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Romance</h1>
            <h1>
                <MovieCoulmn genre={"Romance"}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Drama</h1>
            <h1>
                <MovieCoulmn genre={"Drama"}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Adventure</h1>
            <h1>
                <MovieCoulmn genre={"Adventure"}></MovieCoulmn>
            </h1>
        </div>
    ) :
      (
        <div>
            <h1 class="ui header">Comedy</h1>
            <h1>
                <MovieCoulmn genre={"Comedy"}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Romance</h1>
            <h1>
                <MovieCoulmn genre={"Drama, Romance"}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Drama</h1>
            <h1>
                <MovieCoulmn genre={"Drama"}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Adventure</h1>
            <h1>
                <MovieCoulmn genre={"Adventure"}></MovieCoulmn>
            </h1>
        </div>
    );
    return homePage
}

export default Home;