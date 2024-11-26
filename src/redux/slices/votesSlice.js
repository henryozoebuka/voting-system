import { createSlice } from "@reduxjs/toolkit";

const votesSlice = createSlice({
    name: 'votes',
    initialState: {
        votes: {}
    },

    reducers: {
        setVotes: (state, action) => {
            state.votes = action.payload;
        }
    }
})

export const { setVotes } = votesSlice.actions;
export default votesSlice.reducer;