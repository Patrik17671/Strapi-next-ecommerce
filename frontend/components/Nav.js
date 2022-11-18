import Link from "next/link";
import Cart from "./Cart";
import {selectCartItems} from "../lib/slices/cartItemsSlice";
import {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
const {AnimatePresence, motion} = require('framer-motion');


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
					<Link className="font-bold text-2xl italic" href={"/"}>Spilus</Link>
					<div>
						<div onClick={handleShowCart}>
							<i className="icon-shopping_bag">
								{qty.cartTotalQty > 0 ? (
									<motion.span
										initial={{y: "-10px", opacity: 0, scale: .8}}
										animate={{y: "0",opacity: 1, scale: 1}}
									>{qty.cartTotalQty}
									</motion.span>
								) : null}
							</i>
						</div>
					</div>
				</nav>
				<AnimatePresence>
					{activeCart ? (<Cart handleShowCart={handleShowCart}/>) : null}
				</AnimatePresence>
			</div>
		</header>
		)
}