import { createSlice } from "@reduxjs/toolkit";

const wishlistBookSlice = createSlice({
    name: "wishListBook",
    initialState: { apistatus: "init", books: []},
    reducers: {
        displayWislistBook: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.books = action.payload.books;
        },
        likeBook: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.books = action.payload.books;
        },
        unLikeBook: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.books = action.payload.books;
        }
    }
})

export const {displayWislistBook,likeBook,unLikeBook} = wishlistBookSlice.actions;
export default wishlistBookSlice;