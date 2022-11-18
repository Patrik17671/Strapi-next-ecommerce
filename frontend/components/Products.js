import Link from "next/link";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Product({product}) {
	//Extract data
	const {title, price, images, slug} = product.attributes
	
	
	return (
		<div className="product-list__item">

			<Link href={`/product/${slug}`}>
				<div>
					<img src={images.data[0].attributes.formats.small.url} alt=""/>
					
					
						{/*{images.data.map((image, index) => (*/}
						{/*	<div className="block">*/}
						{/*		<img src={image.attributes.formats.small.url} alt=""/>*/}
						{/*	</div>*/}
						{/*	))}*/}
				
				</div>
			</Link>
			<div className="product-list__item-content">
				<h3 className="">{title}</h3>
				<span>{price} €</span>
			</div>
		</div>
	);
};
