import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
    width: 1190px;
    margin: auto;

    @media (max-width: 1190px) {
        width: 100%;
        padding: 0 30px;
    }
`;

const PageContainer = (props) => {
    return (
        <StyledPage>
            {props.children}
        </StyledPage>
    )
}

export default PageContainer;