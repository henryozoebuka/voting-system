import { createSlice } from "@reduxjs/toolkit";

const serverURLSlice = createSlice({
    name: 'server url',
    initialState: {
        serverURL: 'http://localhost:3001'
    },

    reducers: {
    }
})

export default serverURLSlice.reducer;