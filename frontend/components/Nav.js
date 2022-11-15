import Link from "next/link";
import Cart from "./Cart";
// import {useStateContext} from "../lib/context";
import User from "./User";
import {useUser} from "@auth0/nextjs-auth0";

import { useSelector, useDispatch } from 'react-redux'
import {decrement, increment, cartQtyValue} from '../lib/slices/cartTotalQtySlice'


export default function Nav(){
	
	const qty = useSelector(cartQtyValue)
	// const {showCart, setShowCart, totalQty} = useStateContext();
	const {user, error, isLoading} = useUser();
	console.log(useUser())
	
	return(
		<header>
			<div className="container">
				<nav>
					<Link href={"/"}>homee</Link>
					<div>
						<User />
						<div >
							{/*<h3>Košík <sup>{totalQty > 0 && totalQty}</sup></h3>*/}
							<h3>Košík <sup>{qty > 0 && qty}</sup></h3>
						</div>
					</div>
				</nav>
				{/*{showCart && <Cart />}*/}
				<Cart />
			</div>
		</header>
		)
}