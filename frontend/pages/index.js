import Head from 'next/head';
import {useQuery} from "urql";
import {PROCUT_QUERY} from "../lib/query";

import Product from "../components/Products";
import {getTotals} from "../lib/slices/cartItemsSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export default function Home() {
	
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getTotals());
	}, [])
	
	//Fetch product data from strapi
	const [results] = useQuery({
		query: PROCUT_QUERY
	});
	const {data, fetching, error} = results;
	
	//Waiting for data
	if(fetching) return (
		<div className="fixed w-full h-full inset-0 flex flex-col justify-center items-center">
			<div className="lds-facebook">
				<div />
				<div />
				<div />
			</div>
			<p>Prosím o strpenie prvé spustenie serveru môže trvať 30 sekúnd =).</p>
		</div>
	)
	//Error msgs
	if(error) return <p>Oh nie... {error.message}</p>
	
	//Variables
	const products = data.products.data;
	
	return (
		<div>
			<Head>
				<title>Spilus ecommerce</title>
				<meta name="description" content="Super Spilus next app"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			
			<main>
				<div className="container">
					<div className="product-list">
						{products.map((product, index) => (
							<Product key={index} product={product} />
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
