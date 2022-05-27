import { Product } from '../../graphql/products';

const ProductDetail = ({ item: { id, imageUrl, price, title, description, createdAt } }: { item: Product }) => (
  <div className='product-detail'>
    <p className='product-item__title'>{title}</p>
    <img className='product-item__image' src={imageUrl} />
    <p className='product-item__description'>{description}</p>
    <span className='product-item__price'>${price}</span>
    <span className='product-item__createdAt'> {createdAt}</span>
  </div>
);

export default ProductDetail;
