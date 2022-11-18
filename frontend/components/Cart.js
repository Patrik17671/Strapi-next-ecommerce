import getStripe from "../lib/getStripe";
import {useSelector, useDispatch} from "react-redux";
import {addToCart, decreaseCart, getTotals, removeFromCart, selectCartItems} from "../lib/slices/cartItemsSlice";
import {useEffect} from "react";
import toast from "react-hot-toast";
const {motion} = require('framer-motion');

const cartItemAnim = {
	hidden: {opacity: 0, scale: .8, x: "20%"},
	show: {opacity: 1, scale: 1, x: "0%"}
}

const cartItemsAnim = {
	hidden: {opacity: 1},
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.4,
			staggerChildren: 0.15,
		}
	}
}

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
		localStorage.removeItem("cartItems");
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
			<motion.div
				className="cart"
				initial={{opacity: 0, x: "50%"}}
				animate={{opacity: 1, x: "0%"}}
				exit={{opacity: 0, x: "50%"}}
				transition={{type: 'tween'}}
			>
				<i onClick={handleShowCart} className="icon-plus close" />
				{cart.cartItems.length < 1 && (
					<motion.div
						initial={{opacity: 0, scale: 0.8}}
						animate={{opacity: 1, scale: 1}}
						transition={{delay: .2}}
						className="cart__empty"
					>
						<i className="icon-cart-plus" />
						<h1>
							Máš prázdny košík <i className="icon-sad" />
						</h1>
					</motion.div>
				)}
				<motion.div
					layout
					variants={cartItemsAnim}
					initial="hidden"
					animate="show"
				>
					{cart.cartItems.length >= 1 &&
					cart.cartItems.map((item) => {
						return (
							<motion.div
								layout
								variants={cartItemAnim}
								className="cart__item"
								key={item.slug}
							>
								<img src={item.images.data[0].attributes.formats.small.url} alt={item.title}/>
								<div className="cart__content">
									<div>
										<h3>{item.title}</h3>
										<h5 className="font-medium">{item.price} €</h5>
										{/*<h5>{item.cartQty} ks</h5>*/}
									</div>
									<span className="cursor-pointer" onClick={() => {
										handleDecrease(item)
										toast.success(`${item.title} počet kusov bol znížený`)
									}}>
										<i className="icon-minus" />
									</span>
									<span className="mx-2">{item.cartQty} ks</span>
									<span className="cursor-pointer" onClick={() => handleIncrease({...item, cartQty: 1})}>
										<i className="icon-plus" />
									</span>
									<button className="btn btn--remove" onClick={() => handleRemoveFromCart(item)}>Vymazať</button>
								</div>
							</motion.div>
						)
					})}
				</motion.div>
				{cart.cartItems.length > 0 && (
					<motion.div layout className="flex justify-between items-center">
						<h3>Dokopy: {cart.cartTotalAmount} €</h3>
						<button className="btn" onClick={handleCheckout}>Objednať</button>
					</motion.div>
				)}
			</motion.div>
		</div>
	)
}