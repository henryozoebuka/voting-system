import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        student: {}
    },

    reducers: {
        setStudent: (state, action) => {
            state.student = action.payload;
        }
    }
})

export const { setStudent } = studentSlice.actions;
export default studentSlice.reducer;