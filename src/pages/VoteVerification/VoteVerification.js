import React, { useEffect, useState } from 'react';
import './VoteVerification.css';
import { useDispatch, useSelector } from 'react-redux';
import { setVotes } from '../../redux/slices/votesSlice.js';
import axios from 'axios';

const VoteVerification = () => {
    const { serverURL } = useSelector(state => state.serverURL);
    const { votes } = useSelector(state => state.votes);
    const { students } = useSelector(state => state.students);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                setLoading(true);
                //handle fetch votes
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
    return (
        <div className='vote-verification'>
            <div className='vote-verification-wrapper'>
                {loading ? 
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <p>Loading, please wait...</p>
                </div> :
                <div className='vote-verification-wrapper-inner'>
                    <div className='vote-verification-voter-title' >
                        <p style={{ display: 'flex', minWidth: '100px', maxWidth: '100px', }}>Voter No.</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>President</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Vice President</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Secretary General</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Assistant Secretary General</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Financial Secretary</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Treasurer</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Director of Socials</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Director of Games</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Director of Welfare</p>
                        <p style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>Public Relation Officer</p>
                    </div>

                    <div className='vote-verification-map-div'>
                        {votes.length &&
                            votes.map((voter, index) => {
                                const votedPresident = students.find(student => student.regNo === voter.president);
                                const votedVicePresident = students.find(student => student.regNo === voter.vicePresident);
                                const votedSecretaryGeneral = students.find(student => student.regNo === voter.secretaryGeneral);
                                const votedAssistantSecretaryGeneral = students.find(student => student.regNo === voter.assistantSecretaryGeneral);
                                const votedFinancialSecretary = students.find(student => student.regNo === voter.financialSecretary);
                                const votedTreasurer = students.find(student => student.regNo === voter.treasurer);
                                const votedDirectorOfSocials = students.find(student => student.regNo === voter.directorOfSocials);
                                const votedDirectorOfGames = students.find(student => student.regNo === voter.directorOfGames);
                                const votedDirectorOfWelfare = students.find(student => student.regNo === voter.directorOfWelfare);
                                const votedPublicRelationOfficer = students.find(student => student.regNo === voter.publicRelationOfficer);
                                return <div className='vote-verification-map' key={voter.voterNumber || index}>

                                    <p style={{ display: 'flex', minWidth: '100px', maxWidth: '100px', }}>{voter.voterNumber}</p>
                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px' }}>
                                        <p>{votedPresident ? votedPresident.firstname : 'No'}</p>
                                        <p>{votedPresident ? votedPresident.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px' }}>
                                    <p>{votedVicePresident ? votedVicePresident.firstname : 'No'}</p>
                                    <p>{votedVicePresident ? votedVicePresident.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px' }}>
                                        <p>{votedSecretaryGeneral ? votedSecretaryGeneral.firstname : 'No'}</p>
                                        <p>{votedSecretaryGeneral ? votedSecretaryGeneral.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>
                                        <p>{votedAssistantSecretaryGeneral ? votedAssistantSecretaryGeneral.firstname : 'No'}</p>
                                        <p>{votedAssistantSecretaryGeneral ? votedAssistantSecretaryGeneral.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>
                                        <p>{votedFinancialSecretary ? votedFinancialSecretary.firstname: 'No'}</p>
                                        <p>{votedFinancialSecretary ? votedFinancialSecretary.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>
                                        <p>{votedTreasurer ? votedTreasurer.firstname : 'No'}</p>
                                        <p>{votedTreasurer ? votedTreasurer.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>
                                        <p>{votedDirectorOfSocials ? votedDirectorOfSocials.firstname : 'No'}</p>
                                        <p>{votedDirectorOfSocials ? votedDirectorOfSocials.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>
                                        <p>{votedDirectorOfGames ? votedDirectorOfGames.firstname : 'Vote'}</p>
                                        <p>{votedDirectorOfGames ? votedDirectorOfGames.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>
                                        <p>{votedDirectorOfWelfare ? votedDirectorOfWelfare.firstname : 'No'}</p>
                                        <p>{votedDirectorOfWelfare ? votedDirectorOfWelfare.lastname : 'Vote'}</p>
                                    </div>

                                    <div style={{ display: 'flex', minWidth: '250px', maxWidth: '250px', }}>
                                        <p>{votedPublicRelationOfficer ? votedPublicRelationOfficer.firstname : 'No'}</p>
                                        <p>{votedPublicRelationOfficer ? votedPublicRelationOfficer.lastname : 'Vote'}</p>
                                    </div>

                                </div>
                            })
                        }
                    </div>

                </div>
                }
            </div>
        </div>
    )
}

export default VoteVerification;



// array1 = [{name: 'john', age: 1, color:'green'}, {name: 'Ode', age: 5, color:''}, {name: 'luke', age: 4, color:'brown'}, {name: 'john', age: 1, color:'green'}, {name: 'Ode', age: 5, color:''}, {name: 'luke', age: 4, color:'brown'}, {name: 'john', age: 1, color:'green'}, {name: 'Ode', age: 5, color:''}, {name: 'luke', age: 4, color:'brown'}, {name: 'john', age: 1, color:'green'}, {name: 'Ode', age: 5, color:''}, {name: 'luke', age: 4, color:'brown'},]
// array2 = [{studentName: 'john', age: 1}, {studentName: 'Ode', age: 5}, {studentName: 'luke', age: 4},]

// How can map the objects in array2, and use array2Object.studentName to map the students where studentName matches array1Object.name?

