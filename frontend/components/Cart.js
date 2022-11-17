
import getStripe from "../lib/getStripe";
import {useSelector, useDispatch} from "react-redux";
import {addToCart, decreaseCart, getTotals, removeFromCart, selectCartItems} from "../lib/slices/cartItemsSlice";
import {useEffect} from "react";

export default function Cart({handleShowCart}) {
	
	const cart = useSelector(selectCartItems);
	const dispatch = useDispatch()
	
	//Update total cart qty
	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch])
	
	//Remove item from cart
	const handleRemoveFromCart = (item) => {
		dispatch(removeFromCart(item));
	}
	
	//Decrease qty of cart item
	const handleDecrease = (item) => {
		dispatch(decreaseCart(item))
	}
	
	//Increase qty of cart item
	const handleIncrease = (item) => {
		dispatch(addToCart(item))
	}
	
	//Payment
	const handleCheckout = async () => {
		const stripe = await getStripe();
		const response = await fetch('/api/stripe', {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(cart.cartItems)
		});
		const data = await response.json();
		await stripe.redirectToCheckout({sessionId: data.id})
	}

	
	return (
		<div>
			<div className="overlay" onClick={handleShowCart} />
			<div className="cart">
				{cart.cartItems.length < 1 && (
					<div>
						<h1>
							Máš prázdny košík
						</h1>
					</div>
				)}
				{cart.cartItems.length >= 1 &&
				cart.cartItems.map((item) => {
						return (
							<div key={item.slug}>
								<img src={item.images.data[0].attributes.formats.small.url} alt={item.title}/>
								<div>
									<h3>{item.title}</h3>
									<h5>{item.price}</h5>
									<h5>{item.cartQty}</h5>
								</div>
								<span onClick={() => handleDecrease(item)}>-</span>
								<br/>
								<span>{item.quantity}</span>
								<br/>
								<span onClick={() => handleIncrease({...item, cartQty: 1})}>+</span>
								<button onClick={() => handleRemoveFromCart(item)}>Vymazať</button>
							</div>
						)
					
					})}
				{cart.cartItems.length > 0 && (
					<div>
						<h3>Dokopy: {cart.cartTotalAmount} €</h3>
						<button onClick={handleCheckout}>Objednať</button>
					</div>
				)}
			</div>
		</div>
	)
}