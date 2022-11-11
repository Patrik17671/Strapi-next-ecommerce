import Link from "next/link";
import Cart from "./Cart";
import {useStateContext} from "../lib/context";

export default function Nav(){
	
	const {showCart, setShowCart, totalQty} = useStateContext();
	
	return(
		<header>
			<div className="container">
				<nav>
					<Link href={"/"}>homee</Link>
					<div>
						<div onClick={() => setShowCart(true)}>
							<h3>Košík <sup>{totalQty > 0 && totalQty}</sup></h3>
							
						</div>
					</div>
				</nav>
				{showCart && <Cart />}
			</div>
		</header>
		)
}