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
		<div className="container">
			<div className="success">
				<div>
					<h1>Ďakujeme za objednávku {order.customer_details.name} !</h1>
					<h3>email: {order.customer_details.email}</h3>
					<p className="font-bold mt-6">Zásielka bude odoslaná na:</p>
					<p>{order.customer_details.name}</p>
					<p>{order.customer_details.address.city}</p>
					<p>{order.customer_details.address.line1}</p>
					<p>{order.customer_details.address.line2}</p>
					<p>{order.customer_details.address.postal_code}</p>
					
					<button className="btn mt-8" onClick={() => {
						route.push("/")
						localStorage.removeItem("cartItems");
					}}
					>Návrat na homepage</button>
				</div>
				
			</div>
		</div>
	)
}