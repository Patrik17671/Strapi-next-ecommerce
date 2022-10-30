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
	const {qty} = useStateContext();
	console.log(qty)
	
	return (
		<div>
			<img src={images.data[0].attributes.formats.medium.url} alt={title}  />
			<h3>{title}</h3>
			<p>{description}</p>
			<div>
				<span>Quatity</span>
				<button><AiOutlineMinus/></button>
				<span>0</span>
				<button><AiOutlinePlus/></button>
			</div>
			<button>Add to cart</button>
		</div>
	);
};


