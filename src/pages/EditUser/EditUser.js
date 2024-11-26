import React, { useEffect, useState } from 'react'
import './EditUser.css'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EditUser = () => {
  const { serverURL } = useSelector(state => state.serverURL);
  const { user } = useSelector(state => state.user);
  const { users } = useSelector(state => state.users);
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState('');
  const [failureStatus, setFailureStatus] = useState('');
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    gender: '',
    department: '',
    role: '',
    photo: null,
  });

  const params = useParams();
    const id = params.id;

  //filter user
  const filteredUser = users.find(user => user._id === id);


  //handle change
  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setUserData({ ...userData, [e.target.name]: e.target.files[0] });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    console.log(userData)
  }

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

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

      const response = await axios.patch(`${serverURL}/editUser/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response && response.status === 200) {
        setSuccessStatus(response.data.message);
        setTimeout(() => {
          setSuccessStatus('');
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 402 || error.response.status === 404) {
          setFailureStatus(error.response.data.message);
          setTimeout(() => {
            setFailureStatus('');
          }, 3000);
        }
      }
      console.error('Something went wrong while creating user. ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = () => {
        setUserData({
            firstname: filteredUser.firstname,
            lastname: filteredUser.lastname,
            email: filteredUser.email,
            phoneNumber: filteredUser.phoneNumber,
            gender: filteredUser.gender,
            department: filteredUser.department,
            year: filteredUser.year,
            role: filteredUser.role,
            photo: filteredUser.photo,
        });
    }
    fetchUser();

}, [filteredUser]);


  return (
    <div className='create-user'>
      <div className='create-user-status'>
        {successStatus && <div className='create-user-success-status'>{successStatus}</div>}
        {failureStatus && <div className='create-user-failure-status'>{failureStatus}</div>}
      </div>

      <div className='create-user-wrapper'>
        <div className='create-user-title'>
          <p>Create User</p>
        </div>
        <div className='create-user-form-div'>
          <form onSubmit={handleSubmit}>
            <div className='create-user-firstname-input'>
              <label htmlFor='firstname' >Firstname</label>
              <input type='text' value={userData.firstname} name='firstname' onChange={handleChange} />
            </div>

            <div className='create-user-lastname-input'>
              <label htmlFor='firstname'>Lastname</label>
              <input type='text' value={userData.lastname} name='lastname' onChange={handleChange} />
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

            <div className='create-user-department-input'>
              <label htmlFor='department' >Department</label>
              <select name='department' value={userData.department} onChange={handleChange}>
                <option value='' disabled>Select Department</option>
                <option value='Archeology'>Archeology</option>
                <option value='Fine and Applied Arts'>Fine and Applied Arts</option>
                <option value='Foreign Languages'>Foreign Languages</option>
                <option value='Theatre and Film Studies'>Theatre and Film Studies</option>
              </select>
            </div>

            {user && user.role === 'super admin' &&
              <div className='create-user-role-input'>
              <label htmlFor='role' >Role</label>
              <select name='role' value={userData.role} onChange={handleChange}>
                <option value='' disabled>Select Role</option>
                <option value=''>Deactivate</option>
                <option value='super admin'>Super Admin</option>
                <option value='admin'>Admin</option>
              </select>
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
      </div >
    </div >
  )
}

export default EditUser;