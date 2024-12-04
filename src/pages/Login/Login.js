import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/slices/userSlice.js';
import { setVoter } from '../../redux/slices/voterSlice.js';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const { serverURL } = useSelector(state => state.serverURL)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(true);
  const [failureStatus, setFailureStatus] = useState('')
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [voterLoginData, setVoterLoginData] = useState({ regNo: '', voterNumber: '' });

  //handle user change
  const handleChange = (e) => {
    let value = e.target.value;
    if(e.target.name === 'username') {
      value = e.target.value.toLowerCase();
    }
    setLoginData({ ...loginData, [e.target.name]: value })
  }

  //handle voter change
  const handleVoterChange = (event) => {
    if(event.target.name === 'regNo' || event.target.name === 'voterNumber') {
    let value = event.target.value;
    if(event.target.name === 'regNo') {
      value = event.target.value.toLowerCase();
    }
    setVoterLoginData({ ...voterLoginData, [event.target.name]: value })
  }
  }

  const forVoter = () => {
    setUserLogin(false);
  }

  const forUser = () => {
    setUserLogin(true);
  }

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const responseLogin = await axios.post(`${serverURL}/login`, loginData)
      //handle login response
      if (responseLogin && responseLogin.status === 200) {
        window.scrollTo(0, 0);
        dispatch(setUser(responseLogin.data));

        setSuccessStatus('Logged in successfully!');
        setTimeout(() => {
          setSuccessStatus('');
          navigate('/user');
        }, 3000);
      }
    } catch (error) {
      //handle login error
      setFailureStatus(error?.response?.data.message);
      setTimeout(() => {
        setFailureStatus('');
      }, 3000)

      console.error('Something went wrong while logging in. ', error)
    } finally {
      setLoading(false)
    }
  }

  //handle voter submit
  const handleVoterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${serverURL}/voterLogin`, voterLoginData)
      //handle login response
      if (response && response.status === 200) {
        dispatch(setVoter(response.data));

        setSuccessStatus('Logged in successfully!');
        setTimeout(() => {
          setSuccessStatus('');
          navigate('/voter');
        }, 3000);
      }
    } catch (error) {
      //handle login error
      setFailureStatus(error?.response?.data.message);
      setTimeout(() => {
        setFailureStatus('');
      }, 3000)

      console.error('Something went wrong while logging in. ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='login'>
      <div className='login-status'>
      {loading && <div className='login-success-status'>Loading, please wait...</div>}
        {successStatus && <div className='login-success-status'>{successStatus}</div>}
        {failureStatus && <div className='login-failure-status'>{failureStatus}</div>}
      </div>

      <div className='login-wrapper'>
        <div className='create-user-title'>
          <p>Login</p>
        </div>
        <div className='login-form-div'>

          {userLogin ?
          
          <form onSubmit={handleSubmit}>
            <div className='login-username-input'>
              <label htmlFor='username' >Username</label>
              <input type='text' name='username' onChange={handleChange} />
            </div>

            <div className='login-password-input'>
              <label htmlFor='password' >Password</label>
              <input type='password' name='password' onChange={handleChange} />
            </div>

            <div className='login-submit-input'>
              <input type='submit' value={loading ? 'Logging in...' : 'Login'} disabled={loading} style={{ backgroundColor: loading ? '#BFFFBF' : 'green' }} onChange={handleChange} />
            </div>

          </form> :
          <div style={{width: '100%'}}>
          <form onSubmit={handleVoterSubmit} style={{ width: '100%'}}>
            <div className='login-username-input' style={{ width: '97%'}}>
              <label htmlFor='regNo' >Registration Number</label>
              <input type='text' name='regNo' onChange={handleVoterChange} />
            </div>

            <div className='login-password-input' style={{ width: '97%'}}>
              <label htmlFor='voterNumber' >Voter Secret</label>
              <input type='password' name='voterNumber' onChange={handleVoterChange} />
            </div>

            <div className='login-submit-input' style={{ width: '98%'}}>
              <input type='submit' value={loading ? 'Logging in...' : 'Login'} disabled={loading} style={{ backgroundColor: loading ? '#BFFFBF' : 'green' }} onChange={handleChange} />
            </div>
          </form> </div>
          }

        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginTop: '20px', borderWidth: '1px', borderColor: 'green', borderStyle: 'dotted', maxWidth: '200px'}}>
          <button onClick={() => {forUser()}} style={{fontWeight: 'bold', color: userLogin ? '#ffffff' : 'green', backgroundColor: userLogin ? 'green' : 'transparent', width: '50%', border: 'none', cursor: 'pointer'}}>User</button>
          <button onClick={() => {forVoter()}} style={{fontWeight: 'bold', color: userLogin ? 'green' : '#ffffff', backgroundColor: userLogin ? 'transparent' : 'green', width: '50%', border: 'none', cursor: 'pointer'}}>Voter</button>
        </div>
        <div className='login-create-user'>
          {userLogin && <p>A new user? <Link to={'/createuser'}>Create account.</Link></p>}
        </div>
      </div>
    </div>
  );
}

export default Login;