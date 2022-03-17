import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

function Home(){

    const navigation = useNavigate();

    const tempNav = () => {
        navigation("/movietimeslots");
    }

    return(
        <div>
            <h1>
                Home Page
            </h1>
            <Button onClick={tempNav}>Temporary button to buy tickets</Button>
        </div>
    )
}

export default Home;