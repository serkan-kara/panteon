import React, { useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
`;

const StyledBaseButton = styled.button`
    padding: 12px 15px;
    margin-right: 20px;
    background: #FF6600;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    border: none;
    cursor: pointer;
`;

const StyledMessage = styled.div`
    margin-top: 30px;
    color: #fff;
    font-size: 12px;
`;

const Dashboard = () => {

    const [message, setMessage] = useState('');
    const [loading, setIsLoading] = useState(false);

    const startNewWeek = () => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api/manage/startWeek`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then((result) => {
                setMessage(result.message);
                setIsLoading(false);
            }, (error) => {
                console.log(error);
            })
    }

    const nextDay = () => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api/manage/nextDay`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then((result) => {
                setMessage(result.message);
                setIsLoading(false);
            }, (error) => {
                console.log(error);
            })
    }

    const endWeek = () => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api/manage/endWeek`)
            .then(res => res.json())
            .then((result) => {
                setMessage(result.message);
                setIsLoading(false);
            }, (error) => {
                console.log(error);
            })
    }

    return (
        <React.Fragment>
            <StyledWrapper>
                <StyledBaseButton onClick={startNewWeek}>START WEEK</StyledBaseButton>
                <StyledBaseButton onClick={nextDay}>MOVE TO NEXT DAY</StyledBaseButton>
                <StyledBaseButton onClick={endWeek}>END WEEK</StyledBaseButton>
            </StyledWrapper>
            <StyledMessage>{loading ? 'Loading...' : message}</StyledMessage>
        </React.Fragment>
    )
}

export default Dashboard;