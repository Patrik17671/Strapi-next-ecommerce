import {useStateContext} from "../lib/context";


export default function Cart() {
	
	const {cartItems, showCart, setShowCart,onAdd, onRemove} = useStateContext();
	
	
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
							<div>
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
			</div>
		</div>
	)
}