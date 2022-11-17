import Link from "next/link";
import Cart from "./Cart";
// import {useStateContext} from "../lib/context";
// import User from "./User";
import {useUser} from "@auth0/nextjs-auth0";
import {selectCartItems} from "../lib/slices/cartItemsSlice";
import {useState} from "react";

import { useSelector, useDispatch } from 'react-redux'
// import {decrement, increment, cartQtyValue} from '../lib/slices/cartTotalQtySlice'


export default function Nav(){
	
	const qty = useSelector(selectCartItems)
	const [activeCart, setActiveCart] = useState(false);
	
	const handleShowCart = () => {
		setActiveCart(!activeCart);
	}
	
	console.log(qty.cartTotalQty)
	
	return(
		<header>
			<div className="container">
				<nav>
					<Link href={"/"}>homee</Link>
					<div>
						{/*<User />*/}
						<div onClick={handleShowCart} >
							{/*<h3>Košík <sup>{totalQty > 0 && totalQty}</sup></h3>*/}
							<h3>Košík <sup>{qty.cartTotalQty > 0 && qty.cartTotalQty}</sup></h3>
						</div>
					</div>
				</nav>
				{activeCart ?
					(<Cart
					handleShowCart={handleShowCart}
					/>) : null}
			</div>
		</header>
		)
}