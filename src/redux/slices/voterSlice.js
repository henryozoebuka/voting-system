import { createSlice } from "@reduxjs/toolkit";

const voterSlice = createSlice({
    name: 'voter',
    initialState: {
        voter: null
    },

    reducers: {
        setVoter: (state, action) => {
            state.voter = action.payload;
        }
    }
})

export const { setVoter } = voterSlice.actions;
export default voterSlice.reducer;