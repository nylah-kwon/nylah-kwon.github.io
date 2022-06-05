import { Product } from '../../graphql/products';

const ItemData = ({ imageUrl, price, title }: Pick<Product, 'imageUrl' | 'price' | 'title'>) => (
  <>
    <img className='cart-item__image' src={imageUrl} />
    <div>
      <p className='cart-item__title'>{title}</p>
      <p className='cart-item__price'>{price}원</p>
    </div>
  </>
);

export default ItemData;
