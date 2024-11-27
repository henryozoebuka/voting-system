import React, { useEffect, useState } from 'react';
import './ElectionResult.css';
import { useDispatch, useSelector } from 'react-redux';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import axios from 'axios';
import { setVotes } from '../../redux/slices/votesSlice.js'

const ElectionResult = () => {
    const { serverURL } = useSelector(state => state.serverURL);
    const { votes } = useSelector(state => state.votes);
    const { students } = useSelector(state => state.students);
    const [president, setPresident] = useState({});
    const [vicePresident, setVicePresident] = useState({});
    const [secretaryGeneral, setSecretaryGeneral] = useState({});
    const [assistantSecretaryGeneral, setAssistantSecretaryGeneral] = useState({});
    const [financialSecretary, setFinancialSecretary] = useState({});
    const [treasurer, setTreasurer] = useState({});
    const [directorOfSocials, setDirectorOfSocials] = useState({});
    const [directorOfGames, setDirectorOfGames] = useState({});
    const [directorOfWelfare, setDirectorOfWelfare] = useState({});
    const [publicRelationOfficer, setPublicRelationOfficer] = useState({});
    const [slide, setSlide] = useState(0);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const uniqueCategory = [...new Set(students.map(item => item.role))]

    //next button
    const nextButton = () => {
        if (slide < uniqueCategory.length - 2) {
            setSlide(slide + 1)
        }
    }

    //previous button
    const previousButton = () => {
        if (slide > 0) {
            setSlide(slide - 1)
        }
    }

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                setLoading(true);
                const responseVotes = await axios.get(`${serverURL}/fetchVotes`);
                if (responseVotes && responseVotes.status === 200) {
                    dispatch(setVotes(responseVotes.data));
                }
            } catch (error) {
                console.error('Something went wrong while logging in. ', error)
            } finally {
                setLoading(false);
            }
        }
        fetchVotes();
    }, [dispatch, serverURL])

    useEffect(() => {
        if (Array.isArray(votes)) {
            //calculate votes
            const voteCalculations = () => {

                //president
                const presidentVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.president] = (acc[curr.president] || 0) + 1;
                    return acc;
                }, {});

                //vice president
                const vicePresidentVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.vicePresident] = (acc[curr.vicePresident] || 0) + 1;
                    return acc;
                }, {});

                //secretary general
                const secretaryGeneralVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.secretaryGeneral] = (acc[curr.secretaryGeneral] || 0) + 1;
                    return acc;
                }, {});

                //secretary general
                const assistantSecretaryGeneralVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.assistantSecretaryGeneral] = (acc[curr.assistantSecretaryGeneral] || 0) + 1;
                    return acc;
                }, {});

                //financial secretary
                const financialSecretaryVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.financialSecretary] = (acc[curr.financialSecretary] || 0) + 1;
                    return acc;
                }, {});

                //treasurer
                const treasurerVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.treasurer] = (acc[curr.treasurer] || 0) + 1;
                    return acc;
                }, {});

                //director of socials
                const directorOfSocialsVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.directorOfSocials] = (acc[curr.directorOfSocials] || 0) + 1;
                    return acc;
                }, {});

                //director of games
                const directorOfGamesVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.directorOfGames] = (acc[curr.directorOfGames] || 0) + 1;
                    return acc;
                }, {});

                //director of welfare
                const directorOfWelfareVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.directorOfWelfare] = (acc[curr.directorOfWelfare] || 0) + 1;
                    return acc;
                }, {});

                //public relation officer
                const publicRelationOfficerVoteCalculations = votes.reduce((acc, curr) => {
                    acc[curr.publicRelationOfficer] = (acc[curr.publicRelationOfficer] || 0) + 1;
                    return acc;
                }, {});

                // const secretaryVoteCalculations = votes.reduce((acc, curr) => {
                //     acc[curr.secretary] = (acc[curr.secretary] || 0) + 1;
                //     return acc;
                // }, {});

                setPresident(presidentVoteCalculations);
                setVicePresident(vicePresidentVoteCalculations);
                setSecretaryGeneral(secretaryGeneralVoteCalculations);
                setAssistantSecretaryGeneral(assistantSecretaryGeneralVoteCalculations);
                setFinancialSecretary(financialSecretaryVoteCalculations);
                setTreasurer(treasurerVoteCalculations);
                setDirectorOfSocials(directorOfSocialsVoteCalculations);
                setDirectorOfGames(directorOfGamesVoteCalculations);
                setDirectorOfWelfare(directorOfWelfareVoteCalculations);
                setPublicRelationOfficer(publicRelationOfficerVoteCalculations);
                // setSecretary(secretaryVoteCalculations);
            }
            voteCalculations();
        } else { console.error('Votes is not an array', votes); }
    }, [votes])

    return (
        <div className='election-result'>
            <div className='election-result-form-action-buttons-div'>
                <button type='button' onClick={previousButton}><GrLinkPrevious />Previous</button>
                <button type='button' onClick={nextButton}>Next<GrLinkNext /></button>
            </div>
            {
                    loading ?
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            <p>Loading, please wait...</p>
                        </div> :
            <div className='election-result-wrapper'>
                
                        <div className='election-result-category' style={{ transform: `translateX(${slide * -100}%)` }}>

                            {/* president section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>President</h2>
                                </div>
                                {
                                    Object.keys(president).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{president[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((president[item] / Object.values(president).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(president[item] / Object.values(president).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>

                            {/* vice president section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Vice President</h2>
                                </div>
                                {
                                    Object.keys(vicePresident).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{vicePresident[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((vicePresident[item] / Object.values(vicePresident).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(vicePresident[item] / Object.values(vicePresident).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>

                            {/* secretary general section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Secretary General</h2>
                                </div>
                                {
                                    Object.keys(secretaryGeneral).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{secretaryGeneral[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((secretaryGeneral[item] / Object.values(secretaryGeneral).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(secretaryGeneral[item] / Object.values(secretaryGeneral).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>


                            {/* assistant secretary general section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Assistant Secretary General</h2>
                                </div>
                                {
                                    Object.keys(assistantSecretaryGeneral).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{assistantSecretaryGeneral[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((assistantSecretaryGeneral[item] / Object.values(assistantSecretaryGeneral).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(assistantSecretaryGeneral[item] / Object.values(assistantSecretaryGeneral).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>


                            {/* financial secretary section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Financial Secretary</h2>
                                </div>
                                {
                                    Object.keys(financialSecretary).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{financialSecretary[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((financialSecretary[item] / Object.values(financialSecretary).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(financialSecretary[item] / Object.values(financialSecretary).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>


                            {/* treasurer section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Treasurer</h2>
                                </div>
                                {
                                    Object.keys(treasurer).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{treasurer[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((treasurer[item] / Object.values(treasurer).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(treasurer[item] / Object.values(treasurer).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>

                            {/* director of socials section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Director of Socials</h2>
                                </div>
                                {
                                    Object.keys(directorOfSocials).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{directorOfSocials[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((directorOfSocials[item] / Object.values(directorOfSocials).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(directorOfSocials[item] / Object.values(directorOfSocials).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>


                            {/* director of games section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Director Of Games</h2>
                                </div>
                                {
                                    Object.keys(directorOfGames).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{directorOfGames[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((directorOfGames[item] / Object.values(directorOfGames).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(directorOfGames[item] / Object.values(directorOfGames).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>


                            {/* director of welfare section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>director Of Welfare</h2>
                                </div>
                                {
                                    Object.keys(directorOfWelfare).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{directorOfWelfare[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((directorOfWelfare[item] / Object.values(directorOfWelfare).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(directorOfWelfare[item] / Object.values(directorOfWelfare).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>


                            {/* public relation officer section */}
                            <div className='election-result-section'>
                                <div className='election-result-section-title'>
                                    <h2>Public Relation Officer</h2>
                                </div>
                                {
                                    Object.keys(publicRelationOfficer).map((item, index) => {
                                        const findStudent = students.find(student => student.regNo === item);
                                        return <div key={item || index} className='election-result-vote-details-wrapper' style={{ borderRadius: '5px', marginBottom: '5px', backgroundColor: index % 2 ? '#ffffff' : '#e0e3e1' }}>
                                            <div className='election-result-vote-count-details'>
                                                <p>{findStudent?.firstname}</p>
                                                <p>{findStudent?.lastname}</p>
                                            </div>

                                            <div style={{ display: 'flex', columnGap: '10px' }}>
                                                <p>Number of Votes:</p>
                                                <p className='vote-count'>{publicRelationOfficer[item]}</p>
                                            </div>

                                            <div className='election-vote-percentage'>
                                                <p>{((publicRelationOfficer[item] / Object.values(publicRelationOfficer).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</p>
                                                <div style={{ backgroundColor: 'green', height: '5px', width: `${(publicRelationOfficer[item] / Object.values(publicRelationOfficer).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                                            </div>

                                        </div>
                                    })
                                }
                            </div>










                            {/* <div>
                    <h1> President </h1>
                    {president &&
                        <div>
                            <p>student1: {president.student1 ? president.student1 : 0}</p>
                            <div style={{ height: '5px', backgroundColor: 'yellow', width: `${(president.student1 / Object.values(president).reduce((a, b) => a + b, 0)) * 100}%` }}></div>

                            <p>student2: {president.student2 ? president.student2 : 0}</p>
                            <div style={{ height: '5px', backgroundColor: 'yellow', width: `${(president.student2 / Object.values(president).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                            <p>student3: {president.student3 ? president.student3 : 0}</p>
                            <div style={{ height: '5px', backgroundColor: 'yellow', width: `${(president.student3 / Object.values(president).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                        </div>
                    }
                </div>


                <div>
                    <h1> Secretary </h1>
                    {secretary &&
                        <div>
                            <p>student4: {secretary.student4 ? secretary.student4 : 0}</p>
                            <div style={{ height: '5px', backgroundColor: 'yellow', width: `${(secretary.student4 / Object.values(secretary).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                            <p>student5: {secretary.student5 ? secretary.student5 : 0}</p>
                            <div style={{ height: '5px', backgroundColor: 'yellow', width: `${(secretary.student5 / Object.values(secretary).reduce((a, b) => a + b, 0)) * 100}%` }}></div>
                            <p>student6: {secretary.student6 ? secretary.student6 : 0}</p>
                            <div style={{ height: '5px', backgroundColor: 'yellow', width: secretary.student6 ? `${(secretary.student6 / Object.values(secretary).reduce((a, b) => a + b, 0)) * 100}% : 0` : '0px' }}></div>
                        </div>
                    }
                </div> */}

                        </div>
                
            </div>
            }
        </div>
    )
}

export default ElectionResult