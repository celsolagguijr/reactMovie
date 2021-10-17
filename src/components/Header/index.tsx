import React from 'react';
import {Link} from 'react-router-dom'

//img
import reactWebLogo from '../../images/react-movie-logo.svg';
import websiteLogo from '../../images/tmdb_logo.svg';

//styles
import { Wrapper , Content , ImgLogo , WebImgLogo } from './Header.styles'


const Header : React.FC = () => {
    return (
        <Wrapper>
            <Content>
                <Link to='/'>
                    <ImgLogo src={reactWebLogo} alt="React Website" />
                </Link>
                
                <WebImgLogo src={websiteLogo} alt="The movie website" />
            </Content>
        </Wrapper>
    )
}

export default Header;