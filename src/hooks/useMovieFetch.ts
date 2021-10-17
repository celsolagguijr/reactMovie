import { useState , useEffect , useCallback } from 'react';

import { isPersistedState } from '../helpers';

import API , {Movie, Cast , Crew } from '../API';

//type
export type MovieState = Movie & { actors : Cast[] , directors : Crew[] };

export const useMovieFetch = (movieId : number) => {


    const [state ,  setState] = useState<MovieState>({} as MovieState);
    const [loading ,  setLoading] = useState(false);
    const [error ,  setError] = useState(false);

    //useCallback used to stop infinite fetch, it checks if the movieId change
    const fetch = useCallback(async()=>{

        try{
            setLoading(true);
            setError(false);
            
            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);

            //filter director 
            const directors = credits.crew.filter((member) => member.job === "Director");

            //nilagay lahat sa isang obj
            setState({
                ...movie,
                actors : credits.cast ,
                directors
            })
            
        setLoading(false);

        }catch(error){
            
            setError(true);
        }
        
    },[movieId]);


    useEffect(()=>{

        const sessionState = isPersistedState(movieId.toString());

        if(sessionState){
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetch();
    },[movieId , fetch]);


    //make useeffect para mag set item
    useEffect(()=>{
        sessionStorage.setItem(movieId.toString(),JSON.stringify(state));

    //ito yung mag babago sa state
    },[movieId , state]);
    
    return { state , loading , error }
}