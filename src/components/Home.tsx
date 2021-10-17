import React from 'react';

//config
import { POSTER_SIZE , BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'

//images
import NoImage from '../images/no_image.jpg';

//components
import HomeImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb'
import Spinner from './Spinner'
import SearchBar from './SearchBar';
import Button from './Button'

//hooks
import { useHomeFetch } from '../hooks/useHomeFetch';



const Home : React.FC = () =>  {

    const { 
            state , 
            loading , 
            error , 
            setSearchTerm , 
            searchTerm , 
            setLoadMore
          } = useHomeFetch();

    if(error) return (<div> Something went Wrong </div>);


    return (
      //fragment para di na gumawa nang div
      <>
{/* HEADER */}
        { 
            //it will now show the picture and background
            !searchTerm &&

            state.results[0] ?  
                <HomeImage 
                    image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title = {state.results[0].original_title}
                    text = {state.results[0].overview}
                />
            : null
        }
{/* HEADER */}


        {/* SEARCHBAR */}
          <SearchBar setSearchTerm = {setSearchTerm}/> {/* //pass (setSearchTerm function) as props */}
        {/* SEARCHBAR */}


        {/* CONTENT */}
          <Grid header={ searchTerm ?  "Search Result": "Popular Movies"}>
            {
              state.results.map(movie => 
                <Thumb
                  key = {movie.id}
                  clicable
                  image = {
                    movie.poster_path
                      ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage
                  }
                  movieId = {movie.id}
                />
              )
            }
             
          </Grid>
        {/* CONTENT */}

            {
               loading && <Spinner />
            }


            {
              state.page < state.total_pages && !loading && (
                <Button text="Load More" callback = {() => setLoadMore(true)} />
              )
            }
      </>
    )
}


export default Home;