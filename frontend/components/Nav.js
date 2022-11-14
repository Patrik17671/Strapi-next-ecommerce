import Link from "next/link";
import Cart from "./Cart";
import {useStateContext} from "../lib/context";
import User from "./User";
import {useUser} from "@auth0/nextjs-auth0";

export default function Nav(){
	
	const {showCart, setShowCart, totalQty} = useStateContext();
	const {user, error, isLoading} = useUser();
	console.log(useUser())
	
	return(
		<header>
			<div className="container">
				<nav>
					<Link href={"/"}>homee</Link>
					<div>
						<User />
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