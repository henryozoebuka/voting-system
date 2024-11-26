import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
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

    role: {
        type: String,
        default: '',
    },

    photo: {
        type: String,
        required: false,
      },

    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;