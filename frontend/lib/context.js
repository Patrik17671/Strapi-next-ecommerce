import React, {createContext, useContext, useState} from "react";

const CartQtyContext = createContext();

export const StateContext = ({children}) => {
	//Add data for state
	const [qty, setQty] = useState(1);
	return(
		<CartQtyContext.Provider value={{qty}}>
			{children}
		</CartQtyContext.Provider>
	)
}


export const useStateContext = () => useContext(CartQtyContext);