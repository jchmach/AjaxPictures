import React, { useState, useContext } from "react";
import MovieCoulmn from "../components/MovieColumn";
import {AuthContext} from '../context/auth'

function Home(){
    const context = useContext(AuthContext);
    if (context.user){
        const genre1 = context.user.preferredGenre1
        console.log(genre1)
    }
    
    return(
        <div>
            <h1 class="ui header">Suggested</h1>
            <h1>
                <MovieCoulmn genre={context.user.preferredGenre1}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Comedy</h1>
            <h1>
                <MovieCoulmn genre={"Comedy"}></MovieCoulmn>
            </h1>
            <h1 class="ui header">Romance</h1>
            <h1>
                <MovieCoulmn genre={"Drama, Romance"}></MovieCoulmn>
            </h1>
        </div>
    )
}

export default Home;