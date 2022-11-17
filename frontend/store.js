import { configureStore } from '@reduxjs/toolkit'
// import cartTotalQtyReducer from "./lib/slices/cartTotalQtySlice";
import cartItemsReducer from "./lib/slices/cartItemsSlice";

export default configureStore({
	reducer: {
		cartItems: cartItemsReducer
	},
})