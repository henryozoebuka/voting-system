import StudentModel from "../models/studentModel.js";
import VoteModel from "../models/voteModel.js";

const addStudent = async (req, res) => {
    const { regNo, email, phoneNumber, firstname, lastname, gender, department, year, role, photo } = req.body;
    try {
        if (!regNo || !email || !phoneNumber || !firstname || !lastname || !gender || !department || !year ) {

            return res.status(400).json({ message: 'All fields are required.' })
        }
        const existingUser = await StudentModel.findOne({ $or: [{ regNo }, { email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(402).json({ message: 'User already exists.' })
        }
        const voterNumberGeneration = await StudentModel.findOne().sort({ voterNumber: -1 }); 
const nextVoterNumber = voterNumberGeneration ? voterNumberGeneration.voterNumber + 1 : 1001; 

const user = await StudentModel.create({
    regNo,
    email,
    phoneNumber,
    firstname,
    lastname,
    gender,
    department,
    year,
    role,
    voterNumber: nextVoterNumber,
    photo: req.file ? req.file.filename : null,
});


        if (user) {
            res.status(201).json({ ...user.toObject(), message: `${firstname} account created successfully!` });

        }
    } catch (error) {
        console.error('Something went wrong while adding this account. ', error)
        res.status(500).json({ message: 'Something went wrong while adding this account.' })
    }
}

//fetch students
const fetchStudents = async (req, res) => {
    try {
        const students = await StudentModel.find();
        if (!students) {
            return res.status(404).json({message: 'You do not have any students in your record.'});
        }
        res.status(200).json(students);
    } catch (error) {
        console.error('Something went wrong while fetching students (back default). ',error);
        res.status(500).json({message: 'Something went wrong while fetching students (back res.).'});
    }
}

//edit user
const editStudent = async (req, res) => {
    const id = req.params.id
    try {
        const student = await StudentModel.findByIdAndUpdate(id, {...req.body, photo: req.file ? req.file.filename : undefined});
        if (!student) {
            return res.status(404).json({message: 'User not found.'})
        }
        res.status(200).json({message: `${student.firstname}'s account updated successfully.`})
    } catch (error) {
        console.error('Something went wrong (back). ', error);
        res.status(500).json({message: 'Something went wrong while updating this user (back 500)'})
    }
}

//delete user
const deleteStudent = async (req, res) => {
    const id = req.params.id
    try {
        const student = await StudentModel.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({message: 'User not found.'});
        }
        await VoteModel.findOneAndDelete({studentId: student._id});
        res.status(200).json({message: `${student.firstname} ${student.lastname}'s account deleted successfully.`});
        
        
    } catch (error) {
        console.error('Something went wrong (back). ', error);
        res.status(500).json({message: 'Something went wrong while deleting this user (back 500)'})
    }
}


export { addStudent, fetchStudents, editStudent, deleteStudent };