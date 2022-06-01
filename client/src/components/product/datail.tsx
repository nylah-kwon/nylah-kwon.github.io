import { Product } from '../../graphql/products';

const ProductDetail = ({
  item: { id, imageUrl, price, title, description, createdAt },
}: {
  item: Product;
}) => (
  <div className='product-detail'>
    <p className='product-detail__title'>{title}</p>
    <img className='product-detail__image' src={imageUrl} />
    <p className='product-detail__description'>{description}</p>
    <span className='product-detail__price'>{price.toLocaleString()}원</span>
    <span className='product-detail__createdAt'> {createdAt}</span>
  </div>
);

export default ProductDetail;
