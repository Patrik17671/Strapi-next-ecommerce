import {useQuery} from "urql";
import {GET_PRODUCT_QUERY} from "../../lib/query";
import {useRouter} from "next/router";

import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

import { useSelector, useDispatch } from 'react-redux';
import {addToCart, getTotals, selectCartItems} from "../../lib/slices/cartItemsSlice";
import {useEffect, useState} from "react";

export default function ProductDetails() {
	
	//Quantity state
	const [qty, setQty] = useState(1)
	
	const cart = useSelector(selectCartItems);
	const dispatch = useDispatch();
	
	//Update total cart qty
	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch])
	
	//Add to cart
	const handleAddToCart = (product) => {
		dispatch(addToCart(product))
	}
	//Increase product quatity
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	}
	// Decrease product quatity
	const decreaseQty = () => {
		setQty(prevQty => {
			if(prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	}
	
	//Fetch slug
	const {query} = useRouter();
	//Fetch data
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: {slug: query.slug}
	});
	const {data, fetching, error} = results;
	//Waiting for data
	if(fetching) return <p>Načitávam...</p>
	//Error msgs
	if(error) return <p>Niečo sa pokazilo... {error.message}</p>
	//Variables
	const {title, description, images} = data.products.data[0].attributes;
	
	return (
		<div className="container">
			<div className="product">
				<img src={images.data[0].attributes.formats.medium.url} alt={title}  />
				<div className="product__content">
					<h3 className="mb-6">{title}</h3>
					<p className="mb-4">{description}</p>
					<div className="product__quantity">
						<span className="mr-1">Množstvo: </span>
						<button onClick={decreaseQty}>
							<AiOutlineMinus/>
						</button>
						<span className="px-1.5 text-lg">{qty}</span>
						<button  onClick={increaseQty}>
							<AiOutlinePlus/>
						</button>
					</div>
					<button className="btn" onClick={() => handleAddToCart({...data.products.data[0].attributes, cartQty: qty})}>Add to cart</button>
				</div>
			</div>
		</div>
	);
};


