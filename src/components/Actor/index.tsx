import React from 'react';
import {Wrapper , Image} from './Actor.styles';


type Props = {
    name : string;
    character : string;
    imageUrl : string;
}

const Actor : React.FC<Props> = ({name, character , imageUrl}) => (

    <Wrapper>
        <Image src={imageUrl} alt='alt-thumb' />
        <h3>Name : {name}</h3>
        <p>{character}</p>
    </Wrapper>

);



export default Actor;