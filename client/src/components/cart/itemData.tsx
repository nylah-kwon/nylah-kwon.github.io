import { CartType } from '../../graphql/cart';

const ItemData = ({ title, price, imageUrl }: Pick<CartType, 'imageUrl' | 'price' | 'title'>) => (
  <>
    <img className='cart-item__image' src={imageUrl} />
    <div>
      <p className='cart-item__title'>{title}</p>
      <p className='cart-item__price'>{price}원</p>
    </div>
  </>
);

export default ItemData;
