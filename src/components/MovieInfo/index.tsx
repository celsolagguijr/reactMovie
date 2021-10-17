import React from 'react';


//component
import Thumb from '../Thumb';
import {IMAGE_BASE_URL, POSTER_SIZE} from '../../config';
import NoImage from '../../images/no_image.jpg';
import { Wrapper , Content , Text } from './MovieInfo.styles';

import { MovieState } from '../../hooks/useMovieFetch';

type Props = {
    movie : MovieState;
}


const MovieInfo : React.FC<Props> = ({ movie }) => (
    <Wrapper backdrop = { movie.backdrop_path }>
        <Content>

            <Thumb
                image = {
                    movie.poster_path ? (IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path) : NoImage
                }
                clicable = {false}
            />
               
            <Text>

                <h1>{movie.title}</h1>
                <h3>Plot</h3>
                <p>{movie.overview}</p>

                <div className ="rating-directors">
                    <div>
                        <h3>Rating</h3>
                        <div className = "score" >{movie.vote_average}</div>
                    </div>
                    <div className ="director">
                       <h3>Director{movie.directors && (movie.directors.length > 1 ? 's': '')}</h3>
                        {
                            (movie.directors &&
                                movie.directors.map(director => (
                                    <p key = {director.credit_id}> {director.name} </p>)
                                )
                            )
                        } 
                    </div>
                </div>
            </Text>
        </Content>
    </Wrapper>
);

export default MovieInfo;