import { createSlice } from '@reduxjs/toolkit'

export const cartItemsSlice = createSlice({
	name: 'cartItems',
	initialState: {
		cartItems: [],
	},
	reducers: {
		addToCart(state, action){
			
			state.cartItems.push(action.payload);
			// Add product to Cart
			// const onAdd = (product, quantity) => {
			// 	//Increase total cart qty
			// 	setTotalQty((prev) => prev + quantity * quantity);
			//
			// 	//Total price
			// 	setTotalPrice((prev) => prev + product.price)
			//
			// 	//Check if product is in cart
			// 	const exist = cartItems.find(item => item.slug === product.slug)
			// 	if(exist){
			// 		setCartItems(cartItems.map((item) =>
			// 			item.slug === product.slug
			// 				? {...exist,quantity: exist.quantity + quantity} : item));
			// 	}else{
			// 		setCartItems([...cartItems, {...product, quantity: quantity}]);
			// 	}
			// }
		},
		// decrement: (state) => {
		// 	state.value -= 1
		// },
	},
})

// Action creators are generated for each case reducer function
export const { addToCart } = cartItemsSlice.actions

// export const cartQtyValue = (state) => state.totalCartQty.value

export default cartItemsSlice.reducer