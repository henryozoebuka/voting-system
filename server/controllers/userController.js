import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';

//create user
const createUser = async (req, res) => {
    console.log(req.body)
    const { username, email, phoneNumber, password, firstname, lastname, gender, department, photo } = req.body;
    try {
        if (!username || !email || !phoneNumber || !password || !firstname || !lastname || !gender || !department ) {
            return res.status(400).json({ message: 'All fields are required.' })
        }
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(402).json({ message: 'User already exists.' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await UserModel.create({ username, email, phoneNumber, password: hashedPassword, firstname, lastname, gender, department, role: '', photo: req.file ? req.file.filename : null, });
        if (user) {
            res.status(201).json({ message: `${username} account created successfully!` });
        }
    } catch (error) {
        console.error('Something went wrong while creating this account. ', error)
        res.status(500).json({ message: 'Something went wrong while creating this account.' })
    }
}

//login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Backfirst:', req.body);
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const user = await UserModel.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: 'Invalid login details.' })
        } 

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(404).json({ message: 'Invalid login details.' })
        }

        if (user && user.role === '') {
            return res.status(401).json({ message: 'Account not activated; contact your admin.' })
        }
        res.status(200).json(user);

    } catch (error) {
        console.error('Something went wrong while loggging in. ', error);
        res.status(500).json({ message: 'Something went wrong while logging in.' })
    }
}

//fetch users
const fetchUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) {
            return res.status(404).json({message: 'You do not have any users in your record.'});
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Something went wrong while fetching users (back default). ',error);
        res.status(500).json({message: 'Something went wrong while fetching users (back res.).'});
    }
}

//edit user
const editUser = async (req, res) => {
    console.log(req.file, req.body)
    const id = req.params.id
    try {
        const user = await UserModel.findByIdAndUpdate(id, {...req.body, photo: req.file ? req.file.filename : undefined});
        if (!user) {
            return res.status(404).json({message: 'User not found.'})
        }
        res.status(200).json({message: `${user.username}'s account updated successfully.`})
    } catch (error) {
        console.error('Something went wrong (back). ', error);
        res.status(500).json({message: 'Something went wrong while updating this user (back 500)'})
    }
}

//delete user
const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: 'User not found.'})
        }
        res.status(200).json({message: `${user.username}'s account deleted successfully.`})
    } catch (error) {
        console.error('Something went wrong (back). ', error);
        res.status(500).json({message: 'Something went wrong while deleting this user (back 500)'})
    }
}

export { createUser, login, fetchUsers, editUser, deleteUser };