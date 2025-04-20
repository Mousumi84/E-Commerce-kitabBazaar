import { createSlice } from "@reduxjs/toolkit";

const selectedBookSlice = createSlice({
    name : "selectedBook",
    initialState : { apiStatus: "init", bookdetails: []},
    reducers : {
        selectedBook : (state,action) => {
            state.apiStatus = action.payload.apiStatus;
            state.bookdetails = action.payload.bookdetails;
        }
    }
});

export const {selectedBook} = selectedBookSlice.actions;
export default selectedBookSlice;