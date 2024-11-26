import React, { useEffect, useState } from 'react';
import './Students.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setStudents } from '../../redux/slices/studentsSlice.js';
import { setVotes } from '../../redux/slices/votesSlice.js';
import { useNavigate } from 'react-router-dom';

const Students = () => {

  const { serverURL } = useSelector(state => state.serverURL || {});
  const { students } = useSelector(state => state.students || {});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({});
  const [student, setStudent] = useState({});
  const [showStudents, setShowStudents] = useState(false);
  const [failureStatus, setFailureStatus] = useState('');

  const navigate = useNavigate();

  //handle search for student change
  const handleSearchStudentChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    console.log(search)
  }

  //Search for student
  const searchStudent = (e) => {
    e.preventDefault();
    const currentStudent = students.find(student => student.regNo.toLowerCase() === search.search.toLowerCase() || student.email.toLowerCase() === search.search.toLowerCase() || student.phoneNumber.toLowerCase() === search.search.toLowerCase() || student.firstname.toLowerCase() === search.search.toLowerCase());
    if (currentStudent) {
      setStudent(currentStudent);
      console.log(currentStudent)
    } else {
      setStudent({}); // Clear student if not found
      setFailureStatus('Student not found.');
      setTimeout(() => setFailureStatus(''), 3000); // Clear failure message after 3 seconds
    }

  }


  //toggle students list
  const toggleStudentList = () => {
    setShowStudents(!showStudents);
  }


  useEffect(() => {
    //fetch students
    setStudent({})
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${serverURL}/fetchStudents`);
        if (response && response.status === 200) {
          dispatch(setStudents(response.data));
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
    fetchStudents();
  }, [dispatch, serverURL])
  return (
    <div className='students'>
      <div className='students-wrapper'>
        <div className='students-title'>
          <p>Students</p>
        </div>
        <div className='students-search'>
          <form onSubmit={searchStudent}>
            <input type='text' name='search' onChange={handleSearchStudentChange} placeholder="Search for student's record" />
            <input type='submit' value={'Search'} />
          </form>
          
          {student && student.firstname &&
          <div className='students-search-result-title'>
            <p>Reg. Number</p>
            <p>Firstname</p>
            <p>Surname</p>
          </div>}
          {student && student.firstname && <div className='students-search-result'>
            {/* <img src={`${serverURL}/${student.photo}`} alt={student.firstname || student.regNo || 'nothing'} /> */}
            <p>{student.regNo && student.regNo}</p>
            <p>{student.firstname}</p>
            <p>{student.lastname}</p>
            <button onClick={() => { navigate(`/student/${student._id}`) }} ></button>
          </div>
          }
        </div>
        <div className='students-show-students-list'>
          <button onClick={() => { toggleStudentList(); }}>{showStudents ? 'Collapse Student List' : 'Show Students List'}</button>
        </div>
        {showStudents && students.length &&
        <div className='students-student-title'>
            <p>Reg. Number</p>
            <p>Firstname</p>
            <p>Surname</p>
          </div>}
        {failureStatus && <div className="error-message">{failureStatus}</div>}
        {loading ? (
          <div>Loading, please wait...</div>
        ) : (
          showStudents && students.length ? (
            students.map((student, index) => (
              <div key={student._id || index} className='students-student'>
                {/* <img src={`${serverURL}/${student.photo}`} alt={student.firstname || student.regNo || 'nothing'} /> */}
                <p>{student.regNo}</p>
                <p>{student.firstname}</p>
                <p>{student.lastname}</p>
                <button onClick={() => { navigate(`/student/${student._id}`); }}></button>
              </div>
            ))
          ) : (
            null
          )
        )}


      </div></div>

  )
}

export default Students