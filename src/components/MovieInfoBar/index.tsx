import React from 'react';


//helpers
import { calcTime , convertMoney } from '../../helpers';

//components
import {Wrapper , Content} from './MovieInforBar.styles';

type Props = {
    time : number;
    budget : number;
    revenue : number;
}


const MovieInforBar :React.FC<Props> = ({time , budget , revenue}) => (
    <Wrapper>
        <Content>
            <div className = "column">
                <p>Running Time : { time && calcTime(time)}</p>
            </div>
            <div className = "column">
                <p>Budget : { budget && convertMoney(budget)}</p>
            </div>
            <div className = "column">
                <p>Revenue : { revenue && convertMoney(revenue)}</p>
            </div>
        </Content>
    </Wrapper>
);



export default MovieInforBar;