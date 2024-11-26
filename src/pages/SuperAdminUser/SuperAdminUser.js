import React, { useState } from 'react';
import './SuperAdminUser.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import axios from 'axios';

const SuperAdminUser = () => {

    const { serverURL } = useSelector(state => state.serverURL);
    const { users } = useSelector(state => state.users);
    const { id } = useParams();
    const [successStatus, setSuccessStatus] = useState('');
    const [failureStatus, setFailureStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const superAdminUser = users.find(currentSuperAdminUser => currentSuperAdminUser._id === id);
    const navigate = useNavigate();

    //delete user
    const deleteUser = async (userId) => {
        try {
            setLoading(true)
            const response = await axios.delete(`${serverURL}/deleteUser/${userId}`);
            if (response && response.status === 200) {
                setSuccessStatus(response.data.message);
                setDeleteAlert(false);
                setTimeout(() => {
                    navigate('/users');
                }, 3000);
            }
        } catch (error) {
            console.error('Something went wrong while deleting this user (front). ', error)
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
        <div className='super-admin-user'>
            <div className='super-admin-user-status'>
                {successStatus && <div className='super-admin-user-success-status'>{successStatus}</div>}
                {failureStatus && <div className='super-admin-user-failure-status'>{failureStatus}</div>}
            </div>
            <div className='super-admin-user-wrapper'>
                <div className='user-title'>
                    <p>User Profile</p>
                </div>
                <div className='super-admin-user-navigation'>
                    <GrLinkPrevious className='super-admin-user-navigation-buttons' size={30} color='green' style={{ cursor: 'pointer' }} onClick={() => { navigate('/users') }} />
                    <div style={{display: 'flex', columnGap: '5px'}}>
                    <button className='super-admin-user-navigation-buttons' disabled={loading} onClick={() => { navigate(`/edituser/${superAdminUser._id}`) }}>Edit User</button>
                    <button className='super-admin-user-navigation-buttons' onClick={() => { setDeleteAlert(true) }}>Delete User</button>
                    {deleteAlert && <div className='super-admin-user-delete-alert-div'>
                            <div className='super-admin-user-delete-alert'>
                            <p>Are you sure you want to delete <span style={{fontWeight: 'bold'}}>{superAdminUser.firstname} {superAdminUser.lastname}</span> account?</p>
                            <div className='super-admin-user-delete-alert-button-div'>
                            <button disabled={loading} onClick={() => { deleteUser(superAdminUser._id) }}>{loading ? 'Deleting User...' : 'Yes'}</button>
                            <button onClick={() => { setDeleteAlert(false) }}>Cancel</button>
                            </div>
                        </div>
                        </div>}
                    </div>
                </div>
                <div>
                    <button className='super-admin-user-navigation-buttons' onClick={() => { navigate('/user') }}>My Profile</button>
                </div>

                <div className='super-admin-user-photo-div'>
                    <img src={`${serverURL}/${superAdminUser.photo}`} alt={superAdminUser.firstname} />
                </div>
                <div className='super-admin-user-details'>
                    <div className='super-admin-user-details-info'>
                        <p>Username: </p>
                        <p>{superAdminUser.username}</p>
                    </div>
                    <div className='super-admin-user-details-info'>
                        <p>Firstname: </p>
                        <p>{superAdminUser.firstname}</p>
                    </div>
                    <div className='super-admin-user-details-info'>
                        <p>Surname: </p>
                        <p>{superAdminUser.lastname}</p>
                    </div>
                    <div className='super-admin-user-details-info'>
                        <p>Role: </p>
                        <p>{superAdminUser.role}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SuperAdminUser;