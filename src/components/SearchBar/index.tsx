import React , {useState , useEffect , useRef} from 'react';

import searchIcon from '../../images/search-icon.svg'

import {Content, Wrapper} from './SearchBar.styled';

//type
type Props = {
    setSearchTerm : React.Dispatch<React.SetStateAction<string>>;
}


//setSearcTerm is a function to set the value of a state
const SeachBar : React.FC<Props> = ({setSearchTerm}) =>{

    //text search to
    const [state,setState] = useState('');

    //hawak ni useRef yung mga nag bagong values sa DOM
    const initial = useRef(true);

    useEffect(()=>{

        if(initial.current){
            initial.current = false;
            return;
        }

        const timer = setTimeout(()=>{
            setSearchTerm(state);
        },500);

        //CLEAN UP 
        return () => clearTimeout(timer);

    },[setSearchTerm ,state])

    return (
        <Wrapper>
            <Content>
                <img src = {searchIcon} alt="searchIcon" />
                <input 
                    type = "text" 
                    placeholder  = "Search Movie"
                    value = {state}
                    onChange = { e => setState(e.currentTarget.value)  }   
                />
            </Content>
        </Wrapper>
    )
};



export default SeachBar;
