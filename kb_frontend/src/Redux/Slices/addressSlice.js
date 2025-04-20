import { createSlice } from "@reduxjs/toolkit";


const addressSlice = createSlice({
    name: "address",
    initialState: {apistatus: "init", address: []},
    reducers: {
        displayAddress: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.address = action.payload.address;
        },
        addAddress: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.address = action.payload.address;
        },
        removeAddress: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.address = action.payload.address;
        }
    }
})

export const {displayAddress,addAddress,removeAddress} = addressSlice.actions;
export default addressSlice;