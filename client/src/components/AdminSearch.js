import React, {useEffect, useState} from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import {Search, List, Input, Dropdown, Button, Segment} from 'semantic-ui-react'
import MovieListItem from './MovieListItem';
function AdminSearch(props){
    const {searchExisting, clickMovie} = props;
    const [inputVal, setInputVal] = useState("")
    const [query, setQuery] = useState("")
    const [movieList, setList] = useState([])
    const [searchLocal] = useLazyQuery(LOCAL_MOVIES, {
        fetchPolicy: 'no-cache',
        variables: {search: query},
        onCompleted(data){
            setList(data.getLocalMovieList);
        }
    })
    const [searchNew] = useLazyQuery(OMDB_MOVIES, {
        fetchPolicy: 'no-cache',
        variables: {movieTitle: query},
        onCompleted(data){
            setList(data.getMovieOMDB);
        }
    })
    const changeInput = (data) =>{
        setInputVal(data.target.value)
    }

    useEffect(() => {
        searchNew()
    }, [query])

    const search = () => {
        setQuery(inputVal)
    }

    return(
        <div>
            <div id="Search">
                <div id="Search_icon"></div>
                <Input  onChange={changeInput}></Input>
                <Button disabled={!inputVal.length} onClick={() => {search()}}>Search</Button>
            </div>
            <List>
                {movieList.map((movie) => (
                    <List.Item>
                        <MovieListItem poster={movie.Poster} title={movie.Title} year={movie.Year} existing={true} clickMovie={clickMovie}></MovieListItem>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}

export default AdminSearch

const LOCAL_MOVIES = gql`
    query getLocalMovieList(
        $search: String
    ) {
       getLocalMovieList(
           search: $search
       ){
        Title
        Year
        id
        Poster
       }
    }
`
const OMDB_MOVIES = gql`
    query getMovieOMDB(
        $movieTitle: String
    ) {
        getMovieOMDB(
            movieTitle: $movieTitle
        ){
            Title
            Year
            Poster
        }
    }
`