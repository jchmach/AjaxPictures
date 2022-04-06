import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import { useLazyQuery } from '@apollo/client';
import { useNavigate, useLocation } from "react-router-dom";
import {Button, Input} from 'semantic-ui-react'
import AdminSearch from "../components/AdminSearch";

function AdminActions(){
    const navigation = useNavigate()
    const clickMovie = (title, year) => {
<<<<<<< HEAD
        navigation('/adminmovie', {
=======
        navigate('/adminmovie', {
>>>>>>> 67d070f (Implemented admin movie searching for new movie)
            state:{
                title,
                year
            }
        });
    }

    return(
        <div>
            <Button>Add new</Button>
            <Button>Manage</Button>
<<<<<<< HEAD
            <AdminSearch searchExisting={true} clickMovie={clickMovie}></AdminSearch>
=======
            <AdminSearch searchExisting={true}></AdminSearch>
>>>>>>> 67d070f (Implemented admin movie searching for new movie)

        </div>

    )
}


export default AdminActions;