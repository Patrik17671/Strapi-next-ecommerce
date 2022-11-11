import {useQuery} from "urql";
import {GET_PRODUCT_QUERY} from "../../lib/query";
import {useRouter} from "next/router";

import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

import {useStateContext} from "../../lib/context";

export default function ProductDetails() {
	//Fetch slug
	const {query} = useRouter();
	//Fetch data
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: {slug: query.slug}
	});
	const {data, fetching, error} = results;
	//Waiting for data
	if(fetching) return <p>Loading..</p>
	//Error msgs
	if(error) return <p>Oh no... {error.message}</p>
	//Variables
	const {title, description, images} = data.products.data[0].attributes;
	const {qty, increaseQty, decreaseQty, onAdd} = useStateContext();
	
	console.log(data.products.data[0].attributes)
	
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
						<button onClick={increaseQty}>
							<AiOutlinePlus/>
						</button>
					</div>
					<button className="btn" onClick={() => onAdd(data.products.data[0].attributes,qty)}>Add to cart</button>
				</div>
			</div>
			
		</div>
	);
};


