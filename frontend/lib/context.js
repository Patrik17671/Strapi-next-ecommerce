import React, {createContext, useContext, useState} from "react";

const CartQtyContext = createContext();

export const StateContext = ({children}) => {
	//Add data for state
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [qty, setQty] = useState(1);
	
	//Increase product quatity
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	}
	
	//Increase product quatity
	const decreaseQty = () => {
		setQty(prevQty => {
			if(prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	}
	
	//Add product to Cart
	const onAdd = (product, quantity) => {
		//Check if product is in cart
		const exist = cartItems.find(item => item.slug === product.slug)
		if(exist){
			setCartItems(cartItems.map((item) =>
				item.slug === product.slug
					? {...exist,quantity: exist.quantity + quantity} : item));
		}else{
			setCartItems([...cartItems, {...product, quantity: quantity}]);
		}
	}
	
	//Remove product
	const onRemove = (product) => {
		const exist = cartItems.find(item => item.slug === product.slug)
		if(exist.quantity === 1){
			setCartItems(cartItems.filter((item) => item.slug !== product.slug))
		}else {
			setCartItems(cartItems.map((item) =>
				item.slug === product.slug
					? {...exist, quantity: exist.quantity - 1} : item))
		}
	}
	
	
	return(
		<CartQtyContext.Provider
			value={{
				qty,
				increaseQty,
				decreaseQty,
				showCart,
				setShowCart,
				cartItems,
				onAdd,
				onRemove
			}}>
			{children}
		</CartQtyContext.Provider>
	)
}


export const useStateContext = () => useContext(CartQtyContext);