import React from "react";
import MovieCoulmn from "../components/MovieColumn";

function Home(){

    return(
        <div>
            <h1 class="ui header">Suggested</h1>
            <h1>
                <MovieCoulmn></MovieCoulmn>
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