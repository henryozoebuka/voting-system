import React, { useEffect } from 'react';
import './Voter.css';
import {setVotes} from '../../redux/slices/votesSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Voter = () => {
    const { serverURL } = useSelector(state => state.serverURL);
    const { votes } = useSelector(state => state.votes);
    const { voter } = useSelector(state => state.voter);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isVoted = Array.isArray(votes) && votes.some(vote => vote.studentId === voter._id);

    useEffect(() => {
        //fetch votes
        const fetchVotes = async () => {
            try {
                const response = await axios.get(`${serverURL}/fetchVotes`);
                if (response && response.status === 200) {
                    dispatch(setVotes(response.data));
                }
            } catch (error) {
                console.error('Something went wrong while fetching votes (front). ', error)
            }
        }
        

        fetchVotes();
    }, [dispatch, serverURL])
    return (
        <div className='voter'>

            <div className='voter-wrapper'>
                <div className='voter-title'>
                    <p>Voter's Profile</p>
                </div>
                <div className='voter-navigation'>

                    <div style={{ display: 'flex', columnGap: '5px', justifyContent: 'center', margin: 'auto' }}>
                        {!isVoted && <button className='voter-navigation-buttons' onClick={() => { navigate(`/studentvote/${voter._id}`) }}>Vote Now</button>}
                    </div>
                </div>
                <div className='voter-is-voted' style={{ display: isVoted ? 'flex' : 'none' }}>
                    <p>You have voted, please wait for the result.</p>
                </div>
                <div className='voter-photo-div'>
                    <img src={`https://hintlordbucket.s3.us-east-1.amazonaws.com/${voter.photo}`} alt={voter.firstname} />
                </div>
                <div className='voter-details'>
                    <div className='voter-details-info'>
                        <p>Reg. Number: </p>
                        <p style={{ textTransform: 'lowercase' }}>{voter.regNo}</p>
                    </div>
                    <div className='voter-details-info'>
                        <p>Firstname: </p>
                        <p>{voter.firstname}</p>
                    </div>
                    <div className='voter-details-info'>
                        <p>Surname: </p>
                        <p>{voter.lastname}</p>
                    </div>
                    <div className='voter-details-info'>
                        <p>Email: </p>
                        <p style={{ textTransform: 'lowercase' }}>{voter.email}</p>
                    </div>
                    <div className='voter-details-info'>
                        <p>Role: </p>
                        <p>{voter.role}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Voter;