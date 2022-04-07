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

    return(
        <div>
            <Button>Add new</Button>
            <Button>Manage</Button>
            <AdminSearch searchExisting={true} clickMovie={clickMovie}></AdminSearch>

        </div>

    )
}


export default AdminActions;