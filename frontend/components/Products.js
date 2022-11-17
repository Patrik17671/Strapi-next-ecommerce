import Link from "next/link";

export default function Product({product}) {
	//Extract data
	const {title, price, images, slug} = product.attributes
	
	return (
		<div className="product-list__item">
			<Link href={`/product/${slug}`}>
				<div>
					<img src={images.data[0].attributes.formats.small.url} alt=""/>
				</div>
			</Link>
			<h3 className="">{title}</h3>
			<span>{price} €</span>
		</div>
	);
};
