import { createSlice } from "@reduxjs/toolkit";

const frontPageSlice = createSlice({
    name : "frontpage",
    initialState : { apiStatus: "init", data: []},
    reducers : {
        firstScreen : (state,action) => {
            state.apiStatus = action.payload.apiStatus;
            state.data = action.payload.data;
        }
    }
})  

export const {firstScreen} = frontPageSlice.actions;
export default frontPageSlice;