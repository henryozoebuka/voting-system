import express from 'express';
import multer from 'multer';
import { createUser, login, fetchUsers, editUser, deleteUser } from '../controllers/userController.js';
const userRouter = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },

    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}`)
    }
});

const upload = multer({storage});

userRouter.post('/createUser', upload.single('photo'), createUser);
userRouter.post('/login', login);
userRouter.get('/fetchUsers', fetchUsers);
userRouter.patch('/editUser/:id', upload.single('photo'), editUser);
userRouter.delete('/deleteUser/:id', deleteUser);

export default userRouter;