import React, {useEffect, useState} from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { List, Input, Button} from 'semantic-ui-react'
import MovieListItem from './MovieListItem';
function AdminSearch(props){
    const {searchExisting, clickMovie, goBack} = props;
    const [inputVal, setInputVal] = useState("")
    const [query, setQuery] = useState("")
    const [movieList, setList] = useState([])
    const [filteredList, setFiltered] = useState([])


    useQuery(LOCAL_MOVIES, {
            fetchPolicy: 'no-cache',
            variables: {search: query},
            onCompleted(data){
                setFiltered(data.getLocalMovieList);
                if (searchExisting){
                    setList(data.getLocalMovieList)
                }
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

    const filter = () => {
        var filtered = movieList.filter(movie => movie.Title.includes(query));
        setFiltered(filtered);
    }

    useEffect(() => {
        searchExisting? filter() : searchNew()
    }, [query])

    const search = () => {
        setQuery(inputVal)
    }

    const refreshList = (id) => {
        var updatedList = movieList.filter(movie => movie.id != id);
        setList(updatedList);
        setFiltered(updatedList);
    }

    return(
        <div>
            <Button onClick={goBack}>Back</Button>
            <div id="Search">
                <div id="Search_icon"></div>
                <Input  onChange={changeInput}></Input>
                <Button disabled={!inputVal.length && !searchExisting} onClick={() => {search()}}>Search</Button>
            </div>
            <List>
                { searchExisting? filteredList.map((movie) => (
                    <List.Item>
                        <MovieListItem poster={movie.Poster} title={movie.Title} movieId={movie.id}  refreshList={refreshList} year={movie.Year} existing={searchExisting} clickMovie={clickMovie}></MovieListItem>
                    </List.Item>
                )) : movieList.map((movie) => (
                    <List.Item>
                        <MovieListItem poster={movie.Poster} title={movie.Title} year={movie.Year} existing={searchExisting} clickMovie={clickMovie}></MovieListItem>
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