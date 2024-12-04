import React, { useEffect, useState } from 'react';
import './CreateUser.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
const CreateUser = () => {
  const { serverURL } = useSelector(state => state.serverURL);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [successStatus, setSuccessStatus] = useState('');
  const [failureStatus, setFailureStatus] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    repeatPassword: '',
    email: '',
    phoneNumber: '',
    gender: '',
    department: '',
    photo: null,
  });


  const navigate = useNavigate();
  //handle change
  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      const file = e.target.files[0]
      setPhotoPreview(URL.createObjectURL(file))
      setUserData({ ...userData, [e.target.name]: e.target.files[0] }); // For photo, store the file directly
    } else {
      let value = e.target.value;
      if (e.target.name === 'username' || e.target.name === 'email') {
        value = e.target.value.toLowerCase();
      }
      setUserData({ ...userData, [e.target.name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (userData.password !== userData.repeatPassword) {
        setFailureStatus('Passwords do not match!');
        setTimeout(() => {
          setFailureStatus('');
        }, 3000);
        return;
      }

      const formData = new FormData();

      Object.keys(userData).forEach((key) => {
        if (key === 'photo' && userData[key]) {
          // Check if the file input has a file
          const fileInput = e.target.querySelector('input[name="photo"]');
          if (fileInput && fileInput.files[0]) {
            formData.append(key, fileInput.files[0]); // Use the file from the input
          }
        } else {
          formData.append(key, userData[key]);
        }
      });

      const response = await axios.post(`${serverURL}/createUser`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response && response.status === 201) {
        window.scrollTo(0, 0);
        setSuccessStatus(response.data.message);
        setUserData({
          username: '',
          firstname: '',
          lastname: '',
          password: '',
          repeatPassword: '',
          email: '',
          phoneNumber: '',
          gender: '',
          department: '',
          photo: null,
        })
        setTimeout(() => {
          setSuccessStatus('');
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      setFailureStatus(error?.response?.data.message);
      setTimeout(() => {
        setFailureStatus('');
      }, 3000);
      console.error('Something went wrong while creating user. ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='create-user'>
      <div className='create-user-status'>
        {successStatus && <div className='create-user-success-status'>{successStatus}</div>}
        {loading && <div className='create-user-success-status'>Loading, please wait...</div>}
        {failureStatus && <div className='create-user-failure-status'>{failureStatus}</div>}
      </div>

      <div className='create-user-wrapper'>
        <div className='create-user-title'>
          <p>Create User</p>
        </div>
        <div className='create-user-form-div'>
          <form onSubmit={handleSubmit}>
            <div className='create-user-username-input'>
              <label htmlFor='username' >Username</label>
              <input type='text' value={userData.username} name='username' onChange={handleChange} />
            </div>

            <div className='create-user-firstname-input'>
              <label htmlFor='firstname' >Firstname</label>
              <input type='text' value={userData.firstname} name='firstname' onChange={handleChange} />
            </div>

            <div className='create-user-lastname-input'>
              <label htmlFor='firstname'>Surname</label>
              <input type='text' value={userData.lastname} name='lastname' onChange={handleChange} />
            </div>

            <div className='create-user-password-input'>
              <label htmlFor='password' >Password</label>
              <input type='password' value={userData.password} name='password' onChange={handleChange} />
            </div>

            <div className='create-user-repeat-password-input'>
              <label htmlFor='repeat-password' >Repeat password</label>
              <input type='password' value={userData.repeatPassword} name='repeatPassword' onChange={handleChange} />
            </div>

            <div className='create-user-email-input'>
              <label htmlFor='email' >Email</label>
              <input type='email' value={userData.email} name='email' onChange={handleChange} />
            </div>

            <div className='create-user-phone-number-input'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input type='number' value={userData.phoneNumber} name='phoneNumber' onChange={handleChange} />
            </div>

            <div className='create-user-gender-input'>
              <label htmlFor='gender' >Gender</label>
              <div className='create-user-female'>
                <input type='radio' id='female' checked={userData.gender === 'female'} value='female' name='gender' onChange={handleChange} />
                <label htmlFor='female'>Female</label>
              </div>
              <div className='create-user-male'>
                <input type='radio' id='male' checked={userData.gender === 'male'} value='male' name='gender' onChange={handleChange} />
                <label htmlFor='male'>Male</label>
              </div>
            </div>

            {photoPreview && <div className='create-user-photo-input' style={{ width: '100%' }}>
              <img src={photoPreview} alt='selected' style={{ width: '100px', height: '100px', margin: 'auto' }} />
            </div>}

            <div className='create-user-photo-input'>
              <label htmlFor='photo' >Photo</label>
              <input type='file' name='photo' onChange={handleChange} />
            </div>

            <div className='create-user-submit-input'>
              <input type='submit' value={loading ? 'Submiting...' : 'Submit'} disabled={loading} style={{ backgroundColor: loading ? '#BFFFBF' : 'green' }} />
            </div>
          </form>
        </div>
        <div className='login-create-user'>
          <p>Already have an account? <Link to={'/login'}>Login here.</Link></p>
        </div>
      </div >
    </div >
  )
}

export default CreateUser