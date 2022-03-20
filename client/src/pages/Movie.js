import React, {useContext} from 'react'
import MovieComponent from '../components/MovieComponent'
import { AuthContext } from '../context/auth'
import { useNavigate } from "react-router-dom";



export default function Movie() {
    const context = useContext(AuthContext);

    const navigate = useNavigate();

    const purchase = (movieId) =>{
        context.user? navigate("/movietimeslots", {
            state:{
                movieId
            }
        }) : navigate("/login")
    }

    return(<MovieComponent onPurchasePage={false}  movieName="The Batman" navigateNext={purchase}></MovieComponent>)
}
