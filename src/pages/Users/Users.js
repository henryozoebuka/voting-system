import React, { useEffect, useState } from 'react';
import './Users.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers } from '../../redux/slices/usersSlice.js';
import { setVotes } from '../../redux/slices/votesSlice.js';
import { useNavigate } from 'react-router-dom';

const Users = () => {

  const { serverURL } = useSelector(state => state.serverURL || {});
  const { users } = useSelector(state => state.users || {});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({});
  const [user, setUser] = useState({});
  const [showUsers, setShowUsers] = useState(false);
  const [failureStatus, setFailureStatus] = useState('');

  const navigate = useNavigate();

  //handle search for user change
  const handleSearchuserChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    console.log(search)
  }

  //Search for user
  const searchuser = (e) => {
    e.preventDefault();
    const currentuser = users.find(user => user.username.toLowerCase() === search.search.toLowerCase() || user.email.toLowerCase() === search.search.toLowerCase() || user.phoneNumber.toLowerCase() === search.search.toLowerCase() || user.firstname.toLowerCase() === search.search.toLowerCase());
    if (currentuser) {
      setUser(currentuser);
      console.log(currentuser)
    } else {
      setUser({}); // Clear user if not found
      setFailureStatus('user not found.');
      setTimeout(() => setFailureStatus(''), 3000); // Clear failure message after 3 seconds
    }

  }


  //toggle users list
  const toggleuserList = () => {
    setShowUsers(!showUsers);
  }


  useEffect(() => {
    //fetch users
    setUser({})
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${serverURL}/fetchUsers`);
        if (response && response.status === 200) {
          dispatch(setUsers(response.data));
        }

        //handle fetch votes
        const responseVotes = await axios.get(`${serverURL}/fetchVotes`);
        if (responseVotes && responseVotes.status === 200) {
          dispatch(setVotes(responseVotes.data));
        }

      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setFailureStatus(error.response.data.message);
          }
        }

        //handle fetch votes error
        if (error.responseVotes) {
          if (error.responseVotes.status === 400) {
            setFailureStatus(error.responseVotes.data.message);
            setTimeout(() => {
              setFailureStatus('');
            }, 3000)
          }

          if (error.responseVotes.status === 404) {
            setFailureStatus(error.responseVotes.data.message);
            setTimeout(() => {
              setFailureStatus('');
            }, 3000)
          }
        }
        console.error('Something went wrong while logging in. ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers();
    
  }, [dispatch, serverURL])
  return (
    <div className='users'>
      <div className='users-wrapper'>
        <div className='users-title'>
          <p>Users</p>
        </div>
        <div className='users-search'>
          <form onSubmit={searchuser}>
            <input type='text' name='search' onChange={handleSearchuserChange} placeholder="Search for user's record" />
            <input type='submit' value={'Search'} />
          </form>
          
          {user && user.firstname &&
          <div className='users-search-result-title'>
            <p>Username</p>
            <p>Firstname</p>
            <p>Surname</p>
          </div>}
          {user && user.firstname && <div className='users-search-result'>
            {/* <img src={`${serverURL}/${user.photo}`} alt={user.firstname || user.username || 'nothing'} /> */}
            <p>{user.username && user.username}</p>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <button onClick={() => { navigate(`/user/${user._id}`) }} ></button>
          </div>
          }
        </div>
        <div className='users-show-users-list'>
          <button onClick={() => { toggleuserList(); }}>{showUsers ? 'Collapse Users List' : 'Show Users List'}</button>
        </div>
        {showUsers && users.length &&
        <div className='users-user-title'>
            <p>Username</p>
            <p>Firstname</p>
            <p>Surname</p>
          </div>}
        {failureStatus && <div className="error-message">{failureStatus}</div>}
        {loading ? (
          <div>Loading, please wait...</div>
        ) : (
          showUsers && users.length ? (
            users.map((user, index) => (
              <div key={user._id || index} className='users-user'>
                {/* <img src={`${serverURL}/${user.photo}`} alt={user.firstname || user.username || 'nothing'} /> */}
                <p>{user.username}</p>
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
                <button onClick={() => { navigate(`/superadminuser/${user._id}`); }}></button>
              </div>
            ))
          ) : (
            null
          )
        )}


      </div></div>

  )
}

export default Users