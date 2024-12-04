import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice.js'
import { setVoter } from '../../redux/slices/voterSlice.js';

const Header = () => {
    const { user } = useSelector(state => state.user)
    const { voter } = useSelector(state => state.voter)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(setUser(null));
    }

    const logoutVoter = () => {
        dispatch(setVoter(null));
    }

    return (
        <div className='header'>
            <div className='header-wrapper'>
                <div className='header-title'>Faculty of Arts Electoral System</div>
                {user &&
                    <div className='header-profile-logout-div'>
                        <p className='header-profile' onClick={() => { navigate('/user') }}>My Profile</p>
                        <p className='header-logout' onClick={() => { logout() }}>Logout</p>
                    </div>
                }

                {voter &&
                    <div className='header-profile-logout-div'>
                        <p className='header-profile' onClick={() => { navigate('/voter') }}>My Profile</p>
                        <p className='header-logout' onClick={() => { logoutVoter() }}>Logout</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;