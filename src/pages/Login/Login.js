import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/slices/userSlice.js';
import { setStudents } from '../../redux/slices/studentsSlice.js';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const { serverURL } = useSelector(state => state.serverURL)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(true);
  const [failureStatus, setFailureStatus] = useState('')
  const [loginData, setLoginData] = useState({ username: '', password: '' });


  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const responseLogin = await axios.post(`${serverURL}/login`, loginData)
      //handle login response
      if (responseLogin && responseLogin.status === 200) {
        dispatch(setUser(responseLogin.data));

        //handle fetch students
        const responseStudents = await axios.get(`${serverURL}/fetchStudents`);
        if (responseStudents && responseStudents.status === 200) {
          dispatch(setStudents(responseStudents.data));
        }

        setSuccessStatus('Logged in successfully!');
        setTimeout(() => {
          setSuccessStatus('');
          navigate('/user');
        }, 3000);
      }
    } catch (error) {
      //handle login error
      if (error.responseLogin) {
        if (error.responseLogin.status === 400) {
          setFailureStatus(error.responseLogin.data.message);
          setTimeout(() => {
            setFailureStatus('');
          }, 3000)
        }

        if (error.responseLogin.status === 404) {
          setFailureStatus(error.responseLogin.data.message);
          setTimeout(() => {
            setFailureStatus('');
          }, 3000)
        }
      }

      //handle fetch students error
      if (error.responseStudents) {
        if (error.responseStudents.status === 400) {
          setFailureStatus(error.responseStudents.data.message);
          setTimeout(() => {
            setFailureStatus('');
          }, 3000)
        }

        if (error.responseStudents.status === 404) {
          setFailureStatus(error.responseStudents.data.message);
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

  return (
    <div className='login'>
      <div className='login-status'>
        {successStatus && <div className='login-success-status'>{successStatus}</div>}
        {failureStatus && <div className='login-failure-status'>{failureStatus}</div>}
      </div>

      <div className='login-wrapper'>
        <div className='create-user-title'>
          <p>Login</p>
        </div>
        <div className='login-form-div'>

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

          </form>
        </div>
        <div className='login-create-user'>
        <p>Are new user? <Link to={'/createuser'}>Create account.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;