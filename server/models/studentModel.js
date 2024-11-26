import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    regNo: {
        type: String,
        required: true,
    },

    voterNumber: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: true,
    },

    year: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },

    photo: {
        type: String,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;