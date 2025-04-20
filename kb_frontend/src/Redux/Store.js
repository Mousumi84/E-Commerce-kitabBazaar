import { configureStore } from "@reduxjs/toolkit";
import frontPageSlice from "../Redux/Slices/frontPageSlice";
import selectedBookSlice from "./Slices/selectedBookSlice";
import wishlistBookSlice from "./Slices/wishListSlice";
import cartSlice from "./Slices/cartSlice";
import addressSlice from "./Slices/addressSlice";
import orderSlice from "./Slices/oderSlice";


const store = configureStore({
    reducer : {
        frontPage : frontPageSlice.reducer,
        selectBook : selectedBookSlice.reducer,
        wishlistBook : wishlistBookSlice.reducer,
        cart : cartSlice.reducer,
        address : addressSlice.reducer,
        order : orderSlice.reducer,
    }
})

export default store;