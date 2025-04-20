import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: { apistatus: "init", order: []},
    reducers: {
        displayOrder: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.order = action.payload.order;
        },
        placeOrder: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.order = action.payload.order;
        },
        cancelOrder: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.order = action.payload.order;
        }
    }
})

export const {displayOrder,placeOrder,cancelOrder} = orderSlice.actions;
export default orderSlice;