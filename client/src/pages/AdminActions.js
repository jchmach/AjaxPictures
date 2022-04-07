import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import { useLazyQuery } from '@apollo/client';
import { useNavigate, useLocation } from "react-router-dom";
import {Button, Input} from 'semantic-ui-react'
import AdminSearch from "../components/AdminSearch";

function AdminActions(){
    const navigation = useNavigate()
    const clickMovie = (title, year) => {
        navigation('/adminmovie', {
            state:{
                title,
                year
            }
        });
    }

    const [existing, setExisting] = useState(true)
    const [showSearch, setSearch] = useState(false)
    const addNew = () => {setExisting(false); setSearch(true)}
    const manage = () => {setExisting(true); setSearch(true)}

    const goBack = () =>{setSearch(false)}

    return(
        <div>
            {showSearch? <AdminSearch searchExisting={existing} clickMovie={clickMovie} goBack={goBack}></AdminSearch> :
                        <div>            
                            <Button onClick={addNew}>Add new</Button>
                            <Button onClick={manage}>Manage</Button> 
                        </div> 
            }
        </div>

    )
}


export default AdminActions;