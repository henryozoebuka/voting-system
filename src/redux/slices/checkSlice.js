import { createSlice } from "@reduxjs/toolkit";

const checkSlice = createSlice({
    name: 'check',
    initialState: {
        check: false
    },
    reducers: {
        setCheck: (state) => {
            state.check = !state.check;
        }
    }
})

export const {setCheck} = checkSlice.actions;
export default checkSlice.reducer;