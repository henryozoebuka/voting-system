import React, { useState } from 'react'
import './AddStudent.css'
import { useSelector } from 'react-redux'
import axios from 'axios';
const AddStudent = () => {
  const { serverURL } = useSelector(state => state.serverURL);
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState('');
  const [failureStatus, setFailureStatus] = useState('');
  const [userData, setUserData] = useState({
    regNo: '',
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    gender: '',
    department: '',
    year: '',
    role: '',
    photo: null,
  });

  //handle submit
  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setUserData({ ...userData, [e.target.name]: e.target.files[0] }); // For photo, store the file directly
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
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

      const response = await axios.post(`${serverURL}/addStudent`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response && response.status === 201) {
        setUserData({
          regNo: '',
          firstname: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          gender: '',
          department: '',
          year: '',
          role: '',
          photo: null,
        });
        setSuccessStatus(response.data.message);
        setTimeout(() => {
          setSuccessStatus('');
        }, 3000)
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setFailureStatus(error.response.data.message);
          setTimeout(() => {
            setFailureStatus('');
          }, 3000)
        }

        if (error.response.status === 402) {
          setFailureStatus(error.response.data.message);
          setTimeout(() => {
            setFailureStatus('');
          }, 3000)
        }
      }
      console.error('Something went wrong while creating user. ', error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='add-student'>
      <div className='add-student-status'>
        {successStatus && <div className='add-student-success-status'>{successStatus}</div>}
        {failureStatus && <div className='add-student-failure-status'>{failureStatus}</div>}
      </div>

      <div className='add-student-wrapper'>
        <div className='add-student-title'>
          <p>Add Student</p>
        </div>
        <div className='add-student-form-div'>
          <form onSubmit={handleSubmit}>
            <div className='add-student-regNo-input'>
              <label htmlFor='regNo' >Reg. Number</label>
              <input type='text' value={userData.regNo} name='regNo' onChange={handleChange} />
            </div>

            <div className='add-student-firstname-input'>
              <label htmlFor='firstname' >Firstname</label>
              <input type='text' value={userData.firstname} name='firstname' onChange={handleChange} />
            </div>

            <div className='add-student-lastname-input'>
              <label htmlFor='firstname'>Lastname</label>
              <input type='text' value={userData.lastname} name='lastname' onChange={handleChange} />
            </div>

            <div className='add-student-email-input'>
              <label htmlFor='email' >Email</label>
              <input type='email' value={userData.email} name='email' onChange={handleChange} />
            </div>

            <div className='add-student-phone-number-input'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input type='number' value={userData.phoneNumber} name='phoneNumber' onChange={handleChange} />
            </div>

            <div className='add-student-gender-input'>
              <label htmlFor='gender' >Gender</label>
              <div className='add-student-female'>
                <input type='radio' id='female' checked={userData.gender === 'female'} value='female' name='gender' onChange={handleChange} />
                <label htmlFor='female'>Female</label>
              </div>
              <div className='add-student-male'>
                <input type='radio' id='male' checked={userData.gender === 'male'} value='male' name='gender' onChange={handleChange} />
                <label htmlFor='male'>Male</label>
              </div>
            </div>

            <div className='add-student-department-input'>
              <label htmlFor='department' >Department</label>
              <select name='department' value={userData.department} onChange={handleChange}>
                <option value='' disabled>Select Department</option>
                <option value='Archeology'>Archeology</option>
                <option value='Combined Arts'>Combined Arts</option>
                <option value='English and Literary Studies'>English and Literary Studies</option>
                <option value='Fine and Applied Arts'>Fine and Applied Arts</option>
                <option value='Foreign Languages and Literary Studies'>Foreign Languages and Literary Studies</option>
                <option value='History and International Studies'>History and International Studies</option>
                <option value='Igbo and other Nigerian Languages'>Igbo and other Nigerian Languages</option>
                <option value='Linguistics'>Linguistics</option>
                <option value='Mass Communication'>Mass Communication</option>
                <option value='Music'>Music</option>
                <option value='Theatre and Film Studies'>Theatre and Film Studies</option>
                <option value='Tourism and Heritage Studies'>Tourism and Heritage Studies</option>

              </select>
            </div>

            <div className='add-student-year-input'>
              <label htmlFor='year' >Level</label>
              <select name='year' value={userData.year} onChange={handleChange}>
                <option value='' disabled>Select Year</option>
                <option value='First Year'>First Year</option>
                <option value='Second Year'>Second Year</option>
                <option value='Thrid Year'>Third Year</option>
                <option value='Final Year'>Final Year</option>
              </select>
            </div>

            <div className='add-student-role-input'>
              <label htmlFor='role' >Role</label>
              <select name='role' value={userData.role} onChange={handleChange}>
                <option value='' disabled>Select Role</option>
                <option value='voter'>None</option>
                <option value='president'>President</option>
                <option value='vice president'>Vice President</option>
                <option value='secretary general'>Secretary General</option>
                <option value='assistant secretary general'>Assistant Secretary General</option>
                <option value='financial secretary'>Financial Secretary</option>
                <option value='treasurer'>Treasurer</option>
                <option value='director of socials'>Director of Socials</option>
                <option value='director of games'>Director of Games</option>
                <option value='director of welfare'>Director of Welfare</option>
                <option value='public relation officer'>Public Relation Officer</option>
              </select>
            </div>

            <div className='create-student-photo-input'>
              <label htmlFor='photo' >Photo</label>
              <input type='file' name='photo' onChange={handleChange} className='ret' />
            </div>

            <div className='add-student-submit-input'>
              <input type='submit' value={loading ? 'Submiting...' : 'Submit'} disabled={loading} style={{ backgroundColor: loading ? '#BFFFBF' : 'green' }} />
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}

export default AddStudent