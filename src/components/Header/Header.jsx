import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice.js'
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";


const Header = () => {
    const { user } = useSelector(state => state.user)
    const [menuIcon, setMenuIcon] = useState(false)

    const dispatch = useDispatch();

    const loggedInNavLinks = ['user', 'createuser', 'addstudent', 'students', 'electionresult', 'voteverification'];
    const loggedOutNavLinks = ['login'];

    let navLinks;
    if (user) {
        navLinks = loggedInNavLinks;
    } else {
        navLinks = loggedOutNavLinks;
    }

    const logout = () => {
        dispatch(setUser(null));
    }

    const toggleMenu = () => {
        setMenuIcon(!menuIcon);
    }

    useEffect(() => {
        const outsideClick = (event) => {
            // Correctly access the ref's current value
            if (!event.target.classList.contains('header-menu-icon-open')) {
                setMenuIcon(false);
            }
        };   

        document.addEventListener('click', outsideClick)
        // Cleanup function
        return () => {
            document.removeEventListener('click', outsideClick);
        };
    }, [menuIcon]);
    
    return (
        <div className='header'>
            <div className='header-wrapper'>
                <div className='header-title'>Faculty of Arts Electoral System</div>
                <div className='header-menu-icon-div'>
                    {menuIcon ? <IoClose size={30} color='#ffffff' onClick={() => { toggleMenu() }} className='header-menu-icon-close'/> : <IoIosMenu size={30} color='#ffffff' className='header-menu-icon-open' onClick={() => { toggleMenu() }} />}
                </div>
                <ul className='header-nav-links' style={{ display: menuIcon ? 'flex' : 'none' }}>
                    {
                        navLinks && navLinks.map((link, index) => (<li key={index}><Link className='header-nav-links-link' to={link}>{link}</Link></li>))
                    }
                    {user && <li className='header-logout' onClick={() => { logout() }}>Logout</li>}
                </ul>
            </div>
        </div>
    );
}

export default Header;