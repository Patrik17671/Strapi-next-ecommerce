import {useRouter} from "next/router";
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);


export async function getServerSideProps(params){
	const order = await stripe.checkout.sessions.retrieve(
		params.query.session_id,
		{
			expand: ['line_items'],
		}
	);
	return {
		props: {order}
	}
}

export default function Success({order}){
	
	const route = useRouter();
	console.log(order)
	
	return(
		<div>
			<h1>Dikykčoo za objednávku</h1>
			<h3>{order.customer_details.email}</h3>
			<div>
				<h2>{order.customer_details.city}</h2>
				<h2>{order.customer_details.line1}</h2>
				<h2>{order.customer_details.line2}</h2>
				<h2>{order.customer_details.postal_code}</h2>
				<h2>adres info</h2>
			</div>
			<div>
				<h3>produkty</h3>
			</div>
			<button onClick={() => route.push("/")}>Navrat na hp</button>
		</div>
	)
}