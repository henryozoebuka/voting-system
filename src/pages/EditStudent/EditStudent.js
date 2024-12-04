import React, { useEffect, useState } from 'react'
import './EditStudent.css'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EditStudent = () => {
    const { serverURL } = useSelector(state => state.serverURL);
    const { students } = useSelector(state => state.students)
    const [loading, setLoading] = useState(false);
    const [successStatus, setSuccessStatus] = useState('');
    const [failureStatus, setFailureStatus] = useState('');
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [studentData, setStudentData] = useState({
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

    const params = useParams();
    const id = params.id;

    const filteredStudent = students.find(student => student._id === id)

    //handle change
    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setStudentData({ ...studentData, [e.target.name]: e.target.files[0] });
            setPreviewPhoto(URL.createObjectURL(e.target.files[0]))
        } else {
            let value = e.target.value;
            if (e.target.name === 'regNo' || e.target.name === 'email') {
                value = e.target.value.toLowerCase();
            }
            setStudentData({ ...studentData, [e.target.name]: value });
        }
    }

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();

            Object.keys(studentData).forEach((key) => {
                if (key === 'photo' && studentData[key]) {
                    // Check if the file input has a file
                    const fileInput = e.target.querySelector('input[name="photo"]');
                    if (fileInput && fileInput.files[0]) {
                        formData.append(key, fileInput.files[0]); // Use the file from the input
                    }
                } else {
                    formData.append(key, studentData[key]);
                }
            });

            const response = await axios.patch(`${serverURL}/editStudent/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response && response.status === 200) {
                window.scrollTo(0, 0);
                setSuccessStatus(response.data.message);
                setTimeout(() => {
                    setSuccessStatus('');
                }, 3000)
            }

        } catch (error) {
            setFailureStatus(error.response.data.message);
            setTimeout(() => {
                setFailureStatus('');
            }, 3000)
            console.error('Something went wrong while editing student. ', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const fetchStudent = () => {
            setStudentData({
                regNo: filteredStudent.regNo,
                firstname: filteredStudent.firstname,
                lastname: filteredStudent.lastname,
                email: filteredStudent.email,
                phoneNumber: filteredStudent.phoneNumber,
                gender: filteredStudent.gender,
                department: filteredStudent.department,
                year: filteredStudent.year,
                role: filteredStudent.role,
                photo: filteredStudent.photo,
            });
        }
        fetchStudent();

    }, [filteredStudent]);

    return (
        <div className='add-student'>
            <div className='add-student-status'>
                {successStatus && <div className='add-student-success-status'>{successStatus}</div>}
                {loading && <div className='add-student-success-status'>Loading, please wait...</div>}
                {failureStatus && <div className='add-student-failure-status'>{failureStatus}</div>}
            </div>

            <div className='add-student-wrapper'>
                <div className='add-student-title'>
                    <p>Edit Student</p>
                </div>
                <div className='add-student-form-div'>
                    <form onSubmit={handleSubmit}>
                        <div className='add-student-regNo-input'>
                            <label htmlFor='regNo' >Reg. Number</label>
                            <input type='text' value={studentData.regNo} name='regNo' onChange={handleChange} />
                        </div>

                        <div className='add-student-firstname-input'>
                            <label htmlFor='firstname' >Firstname</label>
                            <input type='text' value={studentData.firstname} name='firstname' onChange={handleChange} />
                        </div>

                        <div className='add-student-lastname-input'>
                            <label htmlFor='lastname'>Surname</label>
                            <input type='text' value={studentData.lastname} name='lastname' onChange={handleChange} />
                        </div>

                        <div className='add-student-email-input'>
                            <label htmlFor='email' >Email</label>
                            <input type='email' value={studentData.email} name='email' onChange={handleChange} />
                        </div>

                        <div className='add-student-phone-number-input'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input type='number' value={studentData.phoneNumber} name='phoneNumber' onChange={handleChange} />
                        </div>

                        <div className='add-student-gender-input'>
                            <label htmlFor='gender' >Gender</label>
                            <div className='add-student-female'>
                                <input type='radio' id='female' checked={studentData.gender === 'female'} value='female' name='gender' onChange={handleChange} />
                                <label htmlFor='female'>Female</label>
                            </div>
                            <div className='add-student-male'>
                                <input type='radio' id='male' checked={studentData.gender === 'male'} value='male' name='gender' onChange={handleChange} />
                                <label htmlFor='male'>Male</label>
                            </div>
                        </div>

                        <div className='add-student-department-input'>
                            <label htmlFor='department' >Department</label>
                            <select name='department' value={studentData.department} onChange={handleChange}>
                                <option value='' disabled>Select Department</option>
                                <option value='Archeology'>Archeology</option>
                                <option value='Fine and Applied Arts'>Fine and Applied Arts</option>
                                <option value='Foreign Languages'>Foreign Languages</option>
                                <option value='Theatre and Film Studies'>Theatre and Film Studies</option>
                            </select>
                        </div>

                        <div className='add-student-year-input'>
                            <label htmlFor='year' >Level</label>
                            <select name='year' value={studentData.year} onChange={handleChange}>
                                <option value='' disabled>Select Year</option>
                                <option value='First Year'>First Year</option>
                                <option value='Second Year'>Second Year</option>
                                <option value='Thrid Year'>Third Year</option>
                                <option value='Final Year'>Final Year</option>
                            </select>
                        </div>

                        <div className='add-student-role-input'>
                            <label htmlFor='role' >Role</label>
                            <select name='role' value={studentData.role} onChange={handleChange}>
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
                        {previewPhoto ?
                            <div className='create-user-photo-input' style={{ width: '100%' }}>
                                <img src={previewPhoto} alt={studentData.firstname} style={{ width: '100px', height: '100px', margin: 'auto' }} />
                            </div> :
                            <div className='create-user-photo-input' style={{ width: '100%' }}>
                                <img src={studentData.photo} alt={studentData.firstname} style={{ width: '100px', height: '100px', margin: 'auto' }} />
                            </div>
                        }
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

export default EditStudent;