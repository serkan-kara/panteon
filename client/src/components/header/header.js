import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';

const StyledWrapper = styled.div`
    display: flex;
    padding: 30px 0;
    align-items: center;
    justify-content: space-between;
`;

const StyledLogo = styled.img`
    width: 175px;

    @media (max-width: 768px) {
        width: 125px;
    }
`;

const StyledText = styled.span`
    color: #fff;
    font-size: 13px;
    font-style: italic;
`;

const Header = () => {
    return (
        <StyledWrapper>
            <StyledLogo src={Logo} />
            <StyledText>LEADERBOARD</StyledText>
        </StyledWrapper>
    )
}

export default Header;