import React, { useEffect, useState } from 'react';
import './EditVote.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";


const EditVote = () => {

    const { serverURL } = useSelector(state => state.serverURL);
    const { students } = useSelector(state => state.students);
    const { votes } = useSelector(state => state.votes);
    const { id } = useParams();
    const [slide, setSlide] = useState(0);
    const [voted, setVoted] = useState(false);
    const [failureStatus, setFailureStatus] = useState('');
    const [verify, setVerify] = useState({
        president: null,
        vicePresident: null,
        generalSecretary: null,
        assistantSecretaryGeneral: null,
        financialSecretary: null,
        treasurer: null,
        directorOfSocials: null,
        directorOfGames: null,
        directorOfWelfare: null,
        publicRelationOfficer: null,
    });

    const navigate = useNavigate();

    const filterCurrentStudent = students.find(student => student._id === id);
    const [vote, setVote] = useState({});

    //fetch student votes
    const filteredVote = votes.find(vote => vote.studentId === id);

    const filterPresidents = students.filter(contestants => contestants.role === 'president');
    const filterVicePresidents = students.filter(contestants => contestants.role === 'vice president');
    const filterSecretaryGenerals = students.filter(contestants => contestants.role === 'secretary general');
    const filterAssistantSecretaryGenerals = students.filter(contestants => contestants.role === 'assistant secretary general');
    const filterFinancialSecretaries = students.filter(contestants => contestants.role === 'financial secretary');
    const filterTreasurers = students.filter(contestants => contestants.role === 'treasurer');
    const filterDirectorOfSocials = students.filter(contestants => contestants.role === 'director of socials');
    const filterDirectorOfGames = students.filter(contestants => contestants.role === 'director of games');
    const filterDirectorOfWelfare = students.filter(contestants => contestants.role === 'director of welfare');
    const filterPublicRelationOfficers = students.filter(contestants => contestants.role === 'public relation officer');

    const uniqueCategory = [...new Set(students.map(item => item.role))]

    //handle change
    const handleChange = (e) => {
        setVote({ ...vote, [e.target.name]: e.target.value });
        console.log(vote)
    }

    //handle submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.patch(`${serverURL}/editVote/${id}`, vote)
            if (response && response.status === 200) {
                console.log(response.data)
                setVoted(true)
                setTimeout(() => {
                    navigate('/students')
                }, 3000)
            }

            if (response && response.status === 202) {
                console.log(response.data)
                setVoted(true)
                setTimeout(() => {
                    navigate('/students')
                }, 3000)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setFailureStatus(error.response.data.message);
                    setTimeout(() => {
                        setFailureStatus('');
                    }, 3000)
                }
            }
            console.log('Something went wrong while casting your vote. ', error)
        }
    }

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
        const findSelectedPresident = students.find(student => student.regNo === vote.president);
        const findSelectedVicePresident = students.find(student => student.regNo === vote.vicePresident);
        const findSelectedSecretaryGeneral = students.find(student => student.regNo === vote.secretaryGeneral);
        const findSelectedAssistantSecretaryGeneral = students.find(student => student.regNo === vote.assistantSecretaryGeneral);
        const findSelectedFinancialSecretary = students.find(student => student.regNo === vote.financialSecretary);
        const findSelectedTreasurer = students.find(student => student.regNo === vote.treasurer);
        const findSelectedDirectorOfSocials = students.find(student => student.regNo === vote.directorOfSocials);
        const findSelectedDirectorOfGames = students.find(student => student.regNo === vote.directorOfGames);
        const findSelectedDirectorOfWelfare = students.find(student => student.regNo === vote.directorOfWelfare);
        const findSelectedPublicRelationOfficer = students.find(student => student.regNo === vote.publicRelationOfficer);
        setVerify({
            president: findSelectedPresident,
            vicePresident: findSelectedVicePresident,
            secretaryGeneral: findSelectedSecretaryGeneral,
            assistantSecretaryGeneral: findSelectedAssistantSecretaryGeneral,
            financialSecretary: findSelectedFinancialSecretary,
            treasurer: findSelectedTreasurer,
            directorOfSocials: findSelectedDirectorOfSocials,
            directorOfGames: findSelectedDirectorOfGames,
            directorOfWelfare: findSelectedDirectorOfWelfare,
            publicRelationOfficer: findSelectedPublicRelationOfficer,
        });
    }, [students, vote]);

    useEffect(() => {
      const fetchVote = () => {
        setVote({
          studentId: id,
          voterNumber: filterCurrentStudent?.voterNumber,
          president: filteredVote?.president || '',
          vicePresident: filteredVote?.vicePresident || '',
          secretaryGeneral: filteredVote?.secretaryGeneral || '',
          assistantSecretaryGeneral: filteredVote?.assistantSecretaryGeneral || '',
          financialSecretary: filteredVote?.financialSecretary || '',
          treasurer: filteredVote?.treasurer || '',
          directorOfSocials: filteredVote?.directorOfSocials || '',
          directorOfGames: filteredVote?.directorOfGames || '',
          directorOfWelfare: filteredVote?.directorOfWelfare || '',
          publicRelationOfficer: filteredVote?.publicRelationOfficer || '',
        });
      }
    
      fetchVote();
    }, [filteredVote, id, filterCurrentStudent]); // Adding dependencies for the effect
    


    return (
        <div className='vote'>
            <div className='vote-wrapper'>
                {voted ? <div>Thank you for voting!</div> :
                    <form onSubmit={handleSubmit}>
                        {failureStatus && <div>{failureStatus}</div>}
                        <div className='vote-form-action-buttons-div'>
                            <button type='button' onClick={previousButton}><GrLinkPrevious />Previous</button>
                            <button type='button' onClick={nextButton}>Next<GrLinkNext /></button>
                        </div>
                        <div className='vote-category' style={{ transform: `translateX(${slide * -100}%)` }}>
                            {
                                filterPresidents && filterPresidents.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterPresidents && filterPresidents.length ? <div className='vote-category-title'>
                                                <p>President</p>
                                            </div> : null
                                        }
                                        {filterPresidents && filterPresidents.length ?
                                            filterPresidents.map((president, index) => (
                                                <div key={president._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' value={president.regNo} name='president' checked={vote.president === president.regNo} onChange={handleChange} />
                                                    <p>{president.firstname}</p>
                                                    <p>{president.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }

                            {
                                filterVicePresidents && filterVicePresidents.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterVicePresidents && filterVicePresidents.length ? <div className='vote-category-title'>
                                                <p>Vice President</p>
                                            </div> : null
                                        }
                                        {filterVicePresidents && filterVicePresidents.length ?
                                            filterVicePresidents.map((vicePresident, index) => (
                                                <div key={vicePresident._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' value={vicePresident.regNo} name='vicePresident' checked={vote.vicePresident === vicePresident.regNo} onChange={handleChange} />
                                                    <p>{vicePresident.firstname}</p>
                                                    <p>{vicePresident.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }


                            {
                                filterSecretaryGenerals && filterSecretaryGenerals.length ?
                                    <div className='vote-category-section'>

                                        <div className='vote-category-title'>
                                            <p>Secretary General</p>
                                        </div>

                                        {filterSecretaryGenerals && filterSecretaryGenerals.length ?
                                            filterSecretaryGenerals.map((secretaryGeneral, index) => (
                                                <div key={secretaryGeneral._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.secretaryGeneral === secretaryGeneral.regNo} value={secretaryGeneral.regNo} name='secretaryGeneral' onChange={handleChange} />
                                                    <p>{secretaryGeneral.firstname}</p>
                                                    <p>{secretaryGeneral.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }


                            {
                                filterAssistantSecretaryGenerals && filterAssistantSecretaryGenerals.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterAssistantSecretaryGenerals && filterAssistantSecretaryGenerals.length ? <div className='vote-category-title'>
                                                <p>Assistant Secretary General</p>
                                            </div> : null
                                        }
                                        {filterAssistantSecretaryGenerals && filterAssistantSecretaryGenerals.length ?
                                            filterAssistantSecretaryGenerals.map((assistantSecretaryGeneral, index) => (
                                                <div key={assistantSecretaryGeneral._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.assistantSecretaryGeneral === assistantSecretaryGeneral.regNo} value={assistantSecretaryGeneral.regNo} name='assistantSecretaryGeneral' onChange={handleChange} />
                                                    <p>{assistantSecretaryGeneral.firstname}</p>
                                                    <p>{assistantSecretaryGeneral.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }


                            {
                                filterFinancialSecretaries && filterFinancialSecretaries.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterFinancialSecretaries && filterFinancialSecretaries.length ? <div className='vote-category-title'>
                                                <p>financialSecretary</p>
                                            </div> : null
                                        }
                                        {filterFinancialSecretaries && filterFinancialSecretaries.length ?
                                            filterFinancialSecretaries.map((financialSecretary, index) => (
                                                <div key={financialSecretary._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.financialSecretary === financialSecretary.regNo} value={financialSecretary.regNo} name='financialSecretary' onChange={handleChange} />
                                                    <p>{financialSecretary.firstname}</p>
                                                    <p>{financialSecretary.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }


                            {
                                filterTreasurers && filterTreasurers.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterTreasurers && filterTreasurers.length ? <div className='vote-category-title'>
                                                <p>treasurer</p>
                                            </div> : null
                                        }
                                        {filterTreasurers && filterTreasurers.length ?
                                            filterTreasurers.map((treasurer, index) => (
                                                <div key={treasurer._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.treasurer === treasurer.regNo} value={treasurer.regNo} name='treasurer' onChange={handleChange} />
                                                    <p>{treasurer.firstname}</p>
                                                    <p>{treasurer.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }

                            {
                                filterDirectorOfSocials && filterDirectorOfSocials.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterDirectorOfSocials && filterDirectorOfSocials.length ? <div className='vote-category-title'>
                                                <p>Director of Socials</p>
                                            </div> : null
                                        }
                                        {filterDirectorOfSocials && filterDirectorOfSocials.length ?
                                            filterDirectorOfSocials.map((directorOfSocials, index) => (
                                                <div key={directorOfSocials._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.directorOfSocials === directorOfSocials.regNo} value={directorOfSocials.regNo} name='directorOfSocials' onChange={handleChange} />
                                                    <p>{directorOfSocials.firstname}</p>
                                                    <p>{directorOfSocials.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }


                            {
                                filterDirectorOfGames && filterDirectorOfGames.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterDirectorOfGames && filterDirectorOfGames.length ? <div className='vote-category-title'>
                                                <p>Director of Games</p>
                                            </div> : null
                                        }
                                        {filterDirectorOfGames && filterDirectorOfGames.length ?
                                            filterDirectorOfGames.map((directorOfGames, index) => (
                                                <div key={directorOfGames._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.directorOfGames === directorOfGames.regNo} value={directorOfGames.regNo} name='directorOfGames' onChange={handleChange} />
                                                    <p>{directorOfGames.firstname}</p>
                                                    <p>{directorOfGames.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }


                            {
                                filterDirectorOfWelfare && filterDirectorOfWelfare.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterDirectorOfWelfare && filterDirectorOfWelfare.length ? <div className='vote-category-title'>
                                                <p>Director of Welfare</p>
                                            </div> : null
                                        }
                                        {filterDirectorOfWelfare && filterDirectorOfWelfare.length ?
                                            filterDirectorOfWelfare.map((directorOfWelfare, index) => (
                                                <div key={directorOfWelfare._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.directorOfWelfare === directorOfWelfare.regNo} value={directorOfWelfare.regNo} name='directorOfWelfare' onChange={handleChange} />
                                                    <p>{directorOfWelfare.firstname}</p>
                                                    <p>{directorOfWelfare.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }


                            {
                                filterPublicRelationOfficers && filterPublicRelationOfficers.length ?
                                    <div className='vote-category-section'>
                                        {
                                            filterPublicRelationOfficers && filterPublicRelationOfficers.length ? <div className='vote-category-title'>
                                                <p>Public Relation Officer</p>
                                            </div> : null
                                        }
                                        {filterPublicRelationOfficers && filterPublicRelationOfficers.length ?
                                            filterPublicRelationOfficers.map((publicRelationOfficer, index) => (
                                                <div key={publicRelationOfficer._id || index} className='vote-contestant' style={{ backgroundColor: index % 2 ? "#ffffff" : '#e0e3e1' }}>
                                                    <input type='radio' checked={vote.publicRelationOfficer === publicRelationOfficer.regNo} value={publicRelationOfficer.regNo} name='publicRelationOfficer' onChange={handleChange} />
                                                    <p>{publicRelationOfficer.firstname}</p>
                                                    <p>{publicRelationOfficer.lastname}</p>
                                                </div>
                                            )) :
                                            <no>No contestants yet.</no>
                                        }
                                    </div> : null
                            }

                            <div className='vote-category-section'>
                                <p>Are you sure these are the ones you want to vote?</p>
                                {verify.president &&
                                    <div className='vote-verify'>
                                        <p>President: </p>
                                        <p>{verify.president.firstname}</p>
                                        <p>{verify.president.lastname}</p>
                                    </div>
                                }
                                {verify.vicePresident &&
                                    <div className='vote-verify'>
                                        <p>Vice President: </p>
                                        <p>{verify.vicePresident.firstname}</p>
                                        <p>{verify.vicePresident.lastname}</p>
                                    </div>
                                }
                                {verify.secretaryGeneral &&
                                    <div className='vote-verify'>
                                        <p>Secretary General: </p>
                                        <p>{verify.secretaryGeneral.firstname}</p>
                                        <p>{verify.secretaryGeneral.lastname}</p>
                                    </div>
                                }
                                {verify.assistantSecretaryGeneral &&
                                    <div className='vote-verify'>
                                        <p>Assistant Secretary General: </p>
                                        <p>{verify.assistantSecretaryGeneral.firstname}</p>
                                        <p>{verify.assistantSecretaryGeneral.lastname}</p>
                                    </div>
                                }
                                {verify.financialSecretary &&
                                    <div className='vote-verify'>
                                        <p>Financial Secretary: </p>
                                        <p>{verify.financialSecretary.firstname}</p>
                                        <p>{verify.financialSecretary.lastname}</p>
                                    </div>
                                }
                                {verify.treasurer &&
                                    <div className='vote-verify'>
                                        <p>Treasurer: </p>
                                        <p>{verify.treasurer.firstname}</p>
                                        <p>{verify.treasurer.lastname}</p>
                                    </div>
                                }
                                {verify.directorOfSocials &&
                                    <div className='vote-verify'>
                                        <p>Director of Socials: </p>
                                        <p>{verify.directorOfSocials.firstname}</p>
                                        <p>{verify.directorOfSocials.lastname}</p>
                                    </div>
                                }
                                {verify.directorOfGames &&
                                    <div className='vote-verify'>
                                        <p>Director of Games: </p>
                                        <p>{verify.directorOfGames.firstname}</p>
                                        <p>{verify.directorOfGames.lastname}</p>
                                    </div>
                                }
                                {verify.directorOfWelfare &&
                                    <div className='vote-verify'>
                                        <p>Director of Welfare: </p>
                                        <p>{verify.directorOfWelfare.firstname}</p>
                                        <p>{verify.directorOfWelfare.lastname}</p>
                                    </div>
                                }
                                {verify.publicRelationOfficer &&
                                    <div className='vote-verify'>
                                        <p>Public Relation Officer: </p>
                                        <p>{verify.publicRelationOfficer.firstname}</p>
                                        <p>{verify.publicRelationOfficer.lastname}</p>
                                    </div>
                                }

                                <div className='vote-submit-div'>
                                    <input type='submit' value={'Submit'} className='vote-submit' />
                                </div>


                            </div>
                        </div>
                    </form>
                }

            </div>
        </div>
    )
}

export default EditVote;