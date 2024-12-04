import {configureStore} from '@reduxjs/toolkit';
import serverURLReducer from './slices/serverURLSlice.js'
import userReducer from './slices/userSlice.js'
import voterReducer from './slices/voterSlice.js'
import usersReducer from './slices/usersSlice.js'
import studentReducer from './slices/studentSlice.js'
import studentsReducer from './slices/studentsSlice.js'
import votesReducer from './slices/votesSlice.js'
import checkReducer from './slices/checkSlice.js'

export default configureStore({
    reducer: {
        user: userReducer,
        voter: voterReducer,
        users: usersReducer,
        student: studentReducer,
        students: studentsReducer,
        votes: votesReducer,
        check: checkReducer,
        serverURL: serverURLReducer,
    }
});