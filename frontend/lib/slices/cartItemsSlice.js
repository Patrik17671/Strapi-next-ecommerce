import {createSlice} from '@reduxjs/toolkit'
// import {useSelector} from "react-redux";
// import {cartQtyValue} from "./cartTotalQtySlice";
//
// const qty = useSelector(cartQtyValue);

const initialState = {
	cartItems: typeof window !== 'undefined' ? localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [] : [],
	cartTotalQty: 0,
	cartTotalAmount: 0
}
export const cartItemsSlice = createSlice({
	name: 'cartItems',
	initialState,
	reducers: {
		addToCart(state, action){
			const itemIndex = state.cartItems.findIndex(
				(item) => item.slug === action.payload.slug
			);
			if(itemIndex >= 0){
				state.cartItems[itemIndex].cartQty += action.payload.cartQty;
			}else{
				const tempProduct = {...action.payload, cartQty: action.payload.cartQty};
				state.cartItems.push(tempProduct)
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeFromCart(state, action){
			state.cartItems = state.cartItems.filter(
				cartItem => cartItem.slug !== action.payload.slug
			);
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
		},
		decreaseCart(state, action){
			const itemIndex = state.cartItems.findIndex(
				cartItem => cartItem.slug === action.payload.slug
			)
			if(state.cartItems[itemIndex].cartQty > 1){
				state.cartItems[itemIndex].cartQty -= 1
			}else if(state.cartItems[itemIndex].cartQty === 1){
				state.cartItems = state.cartItems.filter(
					cartItem => cartItem.slug !== action.payload.slug
				);
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
		},
		getTotals(state, action){
			let {total, qty} = state.cartItems.reduce((cartTotal, cartItem) => {
				const {price, cartQty} = cartItem;
				const itemTotal = price * cartQty;
				
				cartTotal.total += itemTotal
				cartTotal.qty += cartQty
				
				return cartTotal
			},{
				total: 0,
				qty: 0
			})
			
			state.cartTotalQty = qty;
			state.cartTotalAmount = total;
		}
	},
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, decreaseCart, getTotals } = cartItemsSlice.actions

export const selectCartItems = (state) => state.cartItems

export default cartItemsSlice.reducer