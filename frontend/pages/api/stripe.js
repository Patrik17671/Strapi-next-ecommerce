import {Stripe} from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req,res){
	if(req.method === "POST"){
		try {
			const session = await stripe.checkout.sessions.create({
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				shipping_address_collection: {
					allowed_countries: ['SK']
				},
				shipping_options: [
					{shipping_rate: "shr_1M3ff7Eq62cst4Y0fkWo2YwK"},
					{shipping_rate: "shr_1M3fjCEq62cst4Y0A2mu9A8I"}
				],
				allow_promotion_codes: true,
				line_items: req.body.map(item => {
					return{
						price_data: {
							currency: 'eur',
							product_data: {
								name: item.title,
								// images: [item.images.data[0].attributes.formats.small.url]
							},
							unit_amount: item.price * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1
						},
						quantity: item.cartQty
					}
				}),
				success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/canceled`,
			})
			res.status(200).json(session);
		}catch (error){
			res.status(error.statusCode || 500).json(error.message);
		}
		
	}
}