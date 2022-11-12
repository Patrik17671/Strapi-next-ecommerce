import {useStateContext} from "../lib/context";
import getStripe from "../lib/getStripe";

export default function Cart() {
	
	const {cartItems, showCart, setShowCart,onAdd, onRemove, totalPrice} = useStateContext();
	
	//Payment
	const handleCheckout = async () => {
		const stripe = await getStripe();
		const response = await fetch('/api/stripe', {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(cartItems)
		});
		const data = await response.json();
		await stripe.redirectToCheckout({sessionId: data.id})
	}
	
	return (
		<div>
			<div className="overlay" onClick={() => setShowCart(false)}></div>
			<div className="cart">
				{cartItems.length < 1 && (
					<div>
						<h1>
							Máš prázdny košík
						</h1>
					</div>
				)}
				{cartItems.length >= 1 &&
					cartItems.map((item) => {
						return (
							<div key={item.slug}>
								<img src={item.images.data[0].attributes.formats.small.url} alt={item.title}/>
								<div>
									<h3>{item.title}</h3>
									<h5>{item.price}</h5>
								</div>
								<span onClick={() => onRemove(item)}>-</span>
								<span>{item.quantity}</span>
								<span onClick={() => onAdd(item, 1)}>+</span>
							</div>
						)
					
					})}
				{cartItems.length > 0 && (
					<div>
						<h3>Dokopy: {totalPrice}€</h3>
						<button onClick={handleCheckout}>Objednať</button>
					</div>
				)}
			</div>
		</div>
	)
}