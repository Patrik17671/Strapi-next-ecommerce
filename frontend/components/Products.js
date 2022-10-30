import Link from "next/link";

export default function Product({product}) {
	//Extract data
	const {title, price, images, slug} = product.attributes
	return (
		<div>
			<Link href={`/product/${slug}`}>
				<div>
					<img src={images.data[0].attributes.formats.small.url} alt=""/>
				</div>
			</Link>
			<h2 className="">{title}</h2>
			<span>{price}</span>
		</div>
	);
};
