const Product = ({product}) => {
	//Extract data
	const {title, price, images} = product.attributes
	return (
		<div>
			<div>
				<img src={images.data[0].attributes.formats.small.url} alt=""/>
			</div>
			<h2>{title}</h2>
			<h3>{price}</h3>
		</div>
	);
};

export default Product;
