import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { AuthContext } from '../context/auth'

function Home(){
    const context = useContext(AuthContext);
    const navigation = useNavigate();

    const tempNav = () => {
        navigation("/movietimeslots");
    }

    return(
        <div>
            <h1>
                Home Page
            </h1>
            {context.user? <Button onClick={tempNav}>Temporary button to buy tickets</Button> : null}
        </div>
    )
}

export default Home;