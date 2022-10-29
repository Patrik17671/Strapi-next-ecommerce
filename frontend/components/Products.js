import styled from "styled-components";

const Product = ({product}) => {
	//Extract data
	const {title, price, images} = product.attributes
	return (
		<div>
			<div>
				<img src={images.data[0].attributes.formats.small.url} alt=""/>
			</div>
			<h2 className="">{title}</h2>
			<PriceStyle>{price}</PriceStyle>
		</div>
	);
};

export default Product;

const PriceStyle = styled.h3`
	color: red;
`
