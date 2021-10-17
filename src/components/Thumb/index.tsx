import React from 'react';
import {Link} from 'react-router-dom'
import { Image } from './Thumb.styles';


//types
type Props = {
    image : string;
    movieId? : number;
    clicable : boolean;
}


const Thumb : React.FC<Props> = ({image , movieId , clicable}) => ( 
    <div> 
       {
        clicable ? (
                <Link to ={`/${movieId}`}>
                    <Image src={image} alt ="movie-thumb" /> 
                </Link>

            ) : (
                <Image src={image} alt ="movie-thumb" />
            )
       }
    </div> 
);



export default Thumb;