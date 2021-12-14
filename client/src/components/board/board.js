import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BadgeNo1 from '../../assets/images/no1badge.png';
import BadgeNo2 from '../../assets/images/no2badge.png';
import BadgeNo3 from '../../assets/images/no3badge.png';

const StyledTable = styled.div`
    display: grid;
    grid-template-columns: max-content 3fr 2fr 2fr max-content;
    font-size: 12px;

    @media (max-width: 768px) {
        padding: 0;
    }
`;

const StyledTableCell = styled.div`
    padding: 8px 4px;
    color: ${props => props.tick ? '#D572FF' : '#E6E6E6'} ;
    border-bottom: 1px solid #A7A7A7;
    font-weight: ${props => props.tick && '700'};
    border-color: ${props => props.tick && '#D572FF'};
    background: ${props => props.bgColor};
    display: flex;
    align-items: center;
    justify-content: ${props => props.centerText && 'center'};
`;

const StyledTableHead = styled(StyledTableCell)`
    color: #FF6600;
    border: none;
`;

const StyledDivider = styled.div`
    height: 20px;
`;

const StyledRanks = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px 0;

    @media (max-width: 768px) {
        padding: 10px 0;
    }

    @media (max-width: 400px) {
        
    }
`;

const StyledRankRow = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        justify-content: space-evenly;
    }
`;

const StyledPrizeText = styled.span`
    color: #fff;
    margin-left: 10px;
    font-weight: 700;
    
    @media (max-width: 768px) {
        font-size: 13px;
        margin-left: 5px;
    }

    @media (max-width: 420px) {
        margin-left: 5px;
        font-size: 12px;
    }
`;

const StyledRankBadge = styled.img`
    width: 60px;

    @media (max-width: 768px) {
        width: 35px;
    }

    @media (max-width: 420px) {
        width: 25px;
    }
`;

const StyledArrow = styled.div`
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;    
`;

const StyledUpArrow = styled(StyledArrow)`
    border-bottom: 8px solid ${props => props.bgColor};
`;

const StyledDownArrow = styled(StyledArrow)`
    border-top: 8px solid ${props => props.bgColor};
`;

const StyledIdleArrow = styled(StyledArrow)`
    border-radius: 50%;
    border: 5px solid ${props => props.bgColor};
`;

const StyledLoading = styled.div`
    width: 100%;
    text-align: center;
    color: #fff;
`;

const Board = (props) => {

    const [players, setPlayers] = useState([]);
    const [myRank, setMyRank] = useState([]);
    const [prize, setPrize] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const myPlayer = '61b4b6f1d72a78aa8444cac6';

    useEffect(() => {
        fetch(`http://localhost:5000/api/board/${myPlayer}`)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPlayers(result.top);
                setMyRank(result.me);
                setPrize(result.prize);
                console.log(result);
            }, (error) => {
                setIsLoaded(true);
                console.log(error);
            })
    }, [])

    if (isLoaded) {
        return (
            <React.Fragment>
                <StyledRanks>
                    <StyledRankRow>
                        <StyledRankBadge src={BadgeNo1} />
                        <StyledPrizeText>{prize.no1}</StyledPrizeText>
                    </StyledRankRow>
                    <StyledRankRow>
                        <StyledRankBadge src={BadgeNo2} />
                        <StyledPrizeText>{prize.no2}</StyledPrizeText>
                    </StyledRankRow>
                    <StyledRankRow>
                        <StyledRankBadge src={BadgeNo3} />
                        <StyledPrizeText>{prize.no3}</StyledPrizeText>
                    </StyledRankRow>
                </StyledRanks>
                <StyledTable>
                    <StyledTableHead>Rank</StyledTableHead>
                    <StyledTableHead>Username</StyledTableHead>
                    <StyledTableHead>Money</StyledTableHead>
                    <StyledTableHead>Country</StyledTableHead>
                    <StyledTableHead>Daily Diff</StyledTableHead>

                    {
                        players.map(player => {
                            let arrow;
                            if (player.diff === 1) {
                                arrow = <StyledUpArrow bgColor="#00A700" />
                            } else if (player.diff === -1) {
                                arrow = <StyledDownArrow bgColor="#8E0000" />
                            } else {
                                arrow = <StyledIdleArrow bgColor="#E9E200" />
                            }
                            return (
                                <React.Fragment key={player.index}>
                                    <StyledTableCell centerText>{player.index}</StyledTableCell>
                                    <StyledTableCell>{player.userName}</StyledTableCell>
                                    <StyledTableCell>{player.money}</StyledTableCell>
                                    <StyledTableCell>{player.country}</StyledTableCell>
                                    <StyledTableCell centerText>{arrow}</StyledTableCell>
                                </React.Fragment>
                            )
                        })
                    }
                    <StyledTableHead><StyledDivider /></StyledTableHead>
                    <StyledTableHead><StyledDivider /></StyledTableHead>
                    <StyledTableHead><StyledDivider /></StyledTableHead>
                    <StyledTableHead><StyledDivider /></StyledTableHead>
                    <StyledTableHead><StyledDivider /></StyledTableHead>

                    {
                        myRank.map(me => {
                            let arrow;
                            if (me.diff === 1) {
                                arrow = <StyledUpArrow bgColor="#00A700" />
                            } else if (me.diff === -1) {
                                arrow = <StyledDownArrow bgColor="#8E0000" />
                            } else {
                                arrow = <StyledIdleArrow bgColor="#E9E200" />
                            }
                            return (
                                <React.Fragment key={me.index}>
                                    <StyledTableCell tick={me._id === myPlayer && true}>{me.index}</StyledTableCell>
                                    <StyledTableCell tick={me._id === myPlayer && true}>{me.userName}</StyledTableCell>
                                    <StyledTableCell tick={me._id === myPlayer && true}>{me.money}</StyledTableCell>
                                    <StyledTableCell tick={me._id === myPlayer && true}>{me.country}</StyledTableCell>
                                    <StyledTableCell tick={me._id === myPlayer && true} centerText>{arrow}</StyledTableCell>
                                </React.Fragment>
                            )
                        })
                    }
                </StyledTable>
            </React.Fragment>
        )
    } else {
        return (
            <StyledLoading>Loading players...</StyledLoading>
        )
    }
}

export default Board;