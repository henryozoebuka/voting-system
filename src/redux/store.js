import {configureStore} from '@reduxjs/toolkit';
import serverURLReducer from './slices/serverURLSlice.js'
import userReducer from './slices/userSlice.js'
import usersReducer from './slices/usersSlice.js'
import studentReducer from './slices/studentSlice.js'
import studentsReducer from './slices/studentsSlice.js'
import votesReducer from './slices/votesSlice.js'

export default configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        student: studentReducer,
        students: studentsReducer,
        votes: votesReducer,
        serverURL: serverURLReducer,
    }
});