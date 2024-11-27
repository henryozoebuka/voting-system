import React, { useState } from 'react';
import './Student.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Student = () => {

    const { serverURL } = useSelector(state => state.serverURL);
    const { user } = useSelector(state => state.user);
    const { students } = useSelector(state => state.students);
    const { votes } = useSelector(state => state.votes);
    const { id } = useParams();
    const [successStatus, setSuccessStatus] = useState('');
    const [failureStatus, setFailureStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [deleteVoteAlert, setDeleteVoteAlert] = useState(false);
    
    const student = students.find(currentStudent => currentStudent._id === id);
    const navigate = useNavigate();

    const isVoted = Array.isArray(votes) && votes.some(vote => vote.studentId === student._id);

    //delete student
    const deleteStudent = async (studentId) => {
        try {
            setLoading(true)
            const response = await axios.delete(`${serverURL}/deleteStudent/${studentId}`);
            if (response && response.status === 200) {
                setSuccessStatus(response.data.message);
                setDeleteAlert(false);
                setTimeout(() => {
                    navigate('/students');
                }, 3000);
            }
        } catch (error) {
            console.error('Something went wrong while deleting this student account (front). ', error)
            if (error.response) {
                if (error.response.status === 404) {
                    setFailureStatus(error.response.data.message)
                }
            }
        } finally {
            setLoading(false);
        }
    }

    //delete student's vote
    const deleteStudentVote = async (studentId) => {
        try {
            setLoading(true)
            const response = await axios.delete(`${serverURL}/deleteVote/${studentId}`);
            if (response && response.status === 200) {
                setSuccessStatus(response.data.message);
                setDeleteVoteAlert(false);
                setTimeout(() => {
                    navigate('/students')
                }, 3000);
            }
        } catch (error) {
            console.error('Something went wrong while deleting this student vote (front). ', error)
            if (error.response) {
                if (error.response.status === 404) {
                    setFailureStatus(error.response.data.message)
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='student'>
            <div className='student-status'>
                {successStatus && <div className='student-success-status'>{successStatus}</div>}
                {failureStatus && <div className='student-failure-status'>{failureStatus}</div>}
            </div>
            <div className='student-wrapper'>
                <div className='student-title'>
                    <p>Student Profile</p>
                </div>
                <div className='student-navigation'>
                    
                    <div style={{ display: 'flex', columnGap: '5px', justifyContent: 'center', margin: 'auto' }}>
                        {!isVoted && <button className='student-navigation-buttons' onClick={() => { navigate(`/vote/${student._id}`) }}>Vote Now</button>}
                        {user && user.role === 'super admin' && <button className='student-navigation-buttons' disabled={loading} onClick={() => { navigate(`/editstudent/${student._id}`) }}>Edit Student</button>}
                        {user && user.role === 'super admin' && <button className='student-navigation-buttons' disabled={loading} onClick={() => { navigate(`/editvote/${student._id}`) }}>Edit Vote</button>}
                        {user && <button className='student-navigation-buttons' onClick={() => { navigate('/students') }}>Students</button>}
                        {user && user.role === 'super admin' && <button className='student-navigation-buttons' onClick={() => { setDeleteAlert(true) }}>Delete Student</button>}
                        {user && user.role === 'super admin' && <button className='student-navigation-buttons' onClick={() => { setDeleteVoteAlert(true) }}>Delete Student's Votes</button>}
                        {deleteAlert && <div className='student-delete-alert-div'>
                            <div className='student-delete-alert'>
                                <p>Are you sure you want to delete {student.firstname} {student.lastname}'s account?</p>
                                <div className='student-delete-alert-button-div'>
                                    <button disabled={loading} onClick={() => { deleteStudent(student._id) }}>{loading ? 'Deleting Student...' : 'Yes'}</button>
                                    <button onClick={() => { setDeleteAlert(false) }}>Cancel</button>
                                </div>
                            </div>
                        </div>}
                        {deleteVoteAlert && <div className='student-delete-alert-div'>
                            <div className='student-delete-alert'>
                                <p>Are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{student.firstname} {student.lastname}'s</span> votes?</p>
                                <div className='student-delete-alert-button-div'>
                                    <button disabled={loading} onClick={() => { deleteStudentVote(student._id) }}>{loading ? "Deleting Student's vote..." : "Yes"}</button>
                                    <button onClick={() => { setDeleteVoteAlert(false) }}>Cancel</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className='student-is-voted' style={{ display: isVoted ? 'flex' : 'none' }}>
                    <p>This student has voted</p>
                </div>
                <div className='student-photo-div'>
                    <img src={`${serverURL}/${student.photo}`} alt={student.firstname} />
                </div>
                <div className='student-details'>
                    <div className='student-details-info'>
                        <p>Reg. Number: </p>
                        <p>{student.regNo}</p>
                    </div>
                    <div className='student-details-info'>
                        <p>Firstname: </p>
                        <p>{student.firstname}</p>
                    </div>
                    <div className='student-details-info'>
                        <p>Surname: </p>
                        <p>{student.lastname}</p>
                    </div>
                    <div className='student-details-info'>
                        <p>Voter's Number: </p>
                        <p>{student.voterNumber}</p>
                    </div>
                    <div className='student-details-info'>
                        <p>Role: </p>
                        <p>{student.role}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Student;