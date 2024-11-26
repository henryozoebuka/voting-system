import React, { useState } from 'react';
import './User.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";

const User = () => {

    const { serverURL } = useSelector(state => state.serverURL);
    const { user } = useSelector(state => state.user);
    const [actions, setActions] = useState();

    const navigate = useNavigate();

    const toggleActions = () => {
        setActions(!actions)
    }

    return (
        // <div className='user'>
        //   <div className='user-wrapper'>
        //     <div className='user-photo-div'><img src={`${serverURL}/${user.photo}`} alt={user.username || user.regNo || 'nothing'} /></div>
        //     <p>Username: {user.username && user.username}</p>
        //     <p>Reg No: {user.regNo && user.regNo}</p>
        //     <p>Firstname: {user.firstname}</p>
        //     <p>Department: {user.department}</p>
        //     <p>Year: {user.year}</p>
        //     <p>Role: {user.role}</p>
        //   </div>
        // </div>

        <div className='user'>
            <div className='user-wrapper'>
                <div className='user-title'>
                    <p>My Profile</p>
                </div>
                <div className='user-navigation'>
                    <GrLinkPrevious className='user-navigation-buttons' size={30} color='green' style={{ cursor: 'pointer' }} onClick={() => { navigate('/users') }} />
                    <button className='user-navigation-buttons' onClick={toggleActions}>{actions ? 'Close Actions' : 'Actions'}</button>
                    {actions && <div className='user-navigation-buttons-div'>
                        <button className='user-navigation-action' onClick={() => { navigate('/user') }}>My Profile</button>
                        {user && user.role === 'super admin' && <button className='user-navigation-action' onClick={() => { navigate('/users') }}>Users</button>}
                        {user && user.role === 'super admin' && <button className='user-navigation-action' onClick={() => { navigate('/createuser') }}>Create User</button>}
                        {user && user.role === 'super admin' && <button className='user-navigation-action' onClick={() => { navigate('/electionresult') }}>Election Results</button>}
                        <button className='user-navigation-action' onClick={() => { navigate('/students') }}>Students</button>
                        <button className='user-navigation-action' onClick={() => { navigate('/addstudent') }}>Add Student</button>
                        {user && user.role === 'super admin' && <button className='user-navigation-action' onClick={() => { navigate('/voteverification') }}>Votes Verification</button>}
                    </div>}
                </div>
                <div className='user-photo-div'>
                    <img src={`${serverURL}/${user.photo}`} alt={user.firstname} />
                </div>
                <div className='user-details'>
                    <div className='user-details-info'>
                        <p>Username: </p>
                        <p>{user.username}</p>
                    </div>
                    <div className='user-details-info'>
                        <p>Firstname: </p>
                        <p>{user.firstname}</p>
                    </div>
                    <div className='user-details-info'>
                        <p>Surname: </p>
                        <p>{user.lastname}</p>
                    </div>
                    <div className='user-details-info'>
                        <p>Role: </p>
                        <p>{user.role}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default User;