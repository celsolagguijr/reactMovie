import React from 'react';
const { Wrapper ,  Content } = require('./Grid.styles');

type Props = {
    header : string;
}

const Grid : React.FC<Props> = ({header , children}) => (
    <Wrapper>
        <h1>{header}</h1>
        <Content>{children}</Content>
    </Wrapper>
);


export default Grid;