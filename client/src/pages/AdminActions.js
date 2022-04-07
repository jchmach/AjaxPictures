import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate, useLocation } from "react-router-dom";
import {Button, Input} from 'semantic-ui-react'
import AdminSearch from "../components/AdminSearch";

function AdminActions(){
    const navigation = useNavigate()
    const [movieInfo, setInfo] = useState({
        title: "",
        year: ""
    })
    const [createMovie] = useMutation(CREATE_MOVIE, {
        variables: {movieTitle: movieInfo.title, year: movieInfo.year},
        onCompleted(){
            navigate()
        }
    })

    const [getLocal] = useLazyQuery(LOCAL_MOVIE, {
        variables: {movieTitle: movieInfo.title, year: movieInfo.year},
        onCompleted(){
            // Just browse to next page
            navigate()
        },
        onError(err){
            // Add the movie to the db
            if (err.message.includes("No movie with that title exists in DB")){
                createMovie();
            }
        }
    })

    useEffect(() => {
        if (movieInfo.title.length != 0){
            getLocal()
        }
    }, [movieInfo])

    const clickMovie = (title, year) => {
            setInfo({
                title: title,
                year: year
            })
    }

    const navigate = () => {
        var title = movieInfo.title
        var year = movieInfo.year
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

const LOCAL_MOVIE = gql`
    query GetMovieYear(
        $movieTitle: String
        $year: String
    ) {
        GetMovieYear(
            Title: $movieTitle
            Year: $year
        ){
            Title
            Year
            id
            Plot
            Genre
            Runtime
            Director
            Released
            Language
            Country
            Poster
            imdb
            MetaScore
        }
    }
`

const CREATE_MOVIE = gql`
    mutation createMovieYear(
        $movieTitle: String
        $year: String
    ) {
        createMovieYear(
            Title: $movieTitle
            Year: $year
        ){
            id
        }
    }
`