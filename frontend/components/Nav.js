import Link from "next/link";
import Cart from "./Cart";
// import User from "./User";
import {useUser} from "@auth0/nextjs-auth0";
import {selectCartItems} from "../lib/slices/cartItemsSlice";
import {useEffect, useState} from "react";

import { useSelector } from 'react-redux'


export default function Nav(){
	
	const qty = useSelector(selectCartItems)
	const [activeCart, setActiveCart] = useState(false);
	const [scrollNav, setScrollNav] = useState(false);
	
	
	const handleShowCart = () => {
		setActiveCart(!activeCart);
	}
	
	const changeNav = () => {
		if(window.scrollY >= 80 ){
			setScrollNav(true);
		}else {
			setScrollNav(false);
		}
	};
	
	useEffect(() => {
		window.addEventListener("scroll", changeNav)
	})
	
	return(
		<header className={scrollNav ? "scrolled" : ""}>
			<div className="container">
				<nav>
					<Link href={"/"}>Spilus</Link>
					<div>
						<div onClick={handleShowCart}>
							<i className="icon-shopping_bag">
								<span>{qty.cartTotalQty > 0 && qty.cartTotalQty}</span>
							</i>
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