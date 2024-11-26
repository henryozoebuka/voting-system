import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        students: []
    },

    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload;
        }
    }
})

export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;