import { createSlice } from "@reduxjs/toolkit";


const initialState = JSON.parse(localStorage.getItem("cartState")) || { 
    apistatus: "init", 
    items: [], 
    count: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        displayCart: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.items = action.payload.items;
            state.count = action.payload.items.reduce((acc, book) => {
                const existingBook = acc.find(item => item.bookId === book._id);
                if (existingBook) {
                    existingBook.count += 1; // Increment count if book already exists
                } else {
                    acc.push({ bookId: book._id, count: 1 }); // Add new book with count 1
                }
                return acc;
            }, []);
            localStorage.setItem("cartState", JSON.stringify(state));
        },
        addToCart: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.items = action.payload.items;
            const bookId = action.payload.bookId;
            const existingBook = state.count.find(item => item.bookId === bookId);

            if (existingBook) {
                existingBook.count += 1; // Increment count if book exists
            } else {
                state.count.push({ bookId, count: 1 }); // Add new book with count 1
            }
            localStorage.setItem("cartState", JSON.stringify(state));
        },
        removeFromCart: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.items = action.payload.items;
            const bookId = action.payload.bookId;

            const bookIndex = state.count.findIndex(item => item.bookId === bookId);

            if (bookIndex !== -1) {
                if (state.count[bookIndex].count > 1) {
                    state.count[bookIndex].count -= 1; // Decrease count if more than 1
                } else {
                    state.count.splice(bookIndex, 1); // Remove from cart if count is 1
                }
            }
            localStorage.setItem("cartState", JSON.stringify(state));
        },
        noCart: (state,action) => {
            state.apistatus = action.payload.apiStatus;
            state.items = action.payload.items;
            
            localStorage.setItem("cartState", JSON.stringify(state));
        }
    }
})

export const {displayCart,addToCart,removeFromCart,noCart} = cartSlice.actions;
export default cartSlice;