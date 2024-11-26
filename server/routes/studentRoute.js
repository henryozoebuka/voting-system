import express from 'express';
import multer from 'multer';
import { addStudent, deleteStudent, editStudent, fetchStudents } from '../controllers/studentController.js';

const studentRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },

    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}`)
    }
});

const upload = multer({storage});


studentRouter.post('/addStudent', upload.single('photo'), addStudent);
studentRouter.get('/fetchStudents', fetchStudents);
studentRouter.patch('/editStudent/:id', upload.single('photo'), editStudent);
studentRouter.delete('/deleteStudent/:id', deleteStudent);

export default studentRouter;