import { useState , useEffect} from 'react';
import API , { Movie } from '../API'
import {isPersistedState} from '../helpers';

const initialState = {
    page : 0,
    results : [] as Movie[],
    total_pages : 0,
    total_results : 0
}

export const useHomeFetch = () =>{
    
    //useState returns an array so you need to destructure it
    //creating a state 
    const [searchTerm , setSearchTerm] = useState('');
    const [state ,  setState] = useState(initialState);
    const [loading ,  setLoading] = useState(false);
    const [error ,  setError] = useState(false);
    const [loadMore , setLoadMore] = useState(false);

    const  fetchMovies = async (page : number, searchTerm :string = "") => {
        
        try {
            
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm,page);
            //never mutate a state! always giva a new value

            setState(prev => ({
                ...movies,
                results :
                    //if next page append the prev to new datas
                    //append new movies from old movies
                    page > 1 ? [...prev.results,...movies.results] : [...movies.results]
            }));
            

        } catch (error) {
            setError(true);
        }


        setLoading(false);
    };


    // initial render (parang ito yung react life cycle ni react sa stateful)
    useEffect(()=>{

        //Session Storage
        if(!searchTerm){
            
            //giving name into the sessionStorage
            const sessionState = isPersistedState('homeState');

            //if has values then put it in the state;
            if(sessionState){
                setState(sessionState);
                //close the function
                return;
            }
        } 
        //Session Storage

        //wipe out the state
        setState(initialState);

        fetchMovies(1, searchTerm);

    //empty means to trigger in mount
    },[searchTerm]);


    //Load more
    useEffect(()=>{
        //wipe out the state
        
        if(!loadMore) return;

        fetchMovies(state.page + 1, searchTerm);
        
        setLoadMore(false);

    },[loadMore , searchTerm , state.page]);


    //write session storage
    useEffect(()=>{

        
        if(!searchTerm){
             sessionStorage.setItem('homeState', JSON.stringify(state));
        } 



    },[state, searchTerm])

    return { state , loading , error , setSearchTerm , searchTerm , setLoadMore}
}