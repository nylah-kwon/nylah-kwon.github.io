import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { ADD_CART } from '../../graphql/cart';
import { Product } from '../../graphql/products';
import { graphqlFetcher } from '../../queryClient';

const ProductItem = ({ id, imageUrl, price, title, description, createdAt }: Product) => {
  //const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
  //onst addToCart = () => setCartAmount((cartAmount || 0) + 1);
  const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }));
  return (
    <li className='product-item'>
      <Link to={`/products/${id}`}>
        <img className='product-item__image' src={imageUrl} />
        <p className='product-item__title'>{title}</p>
        <p className='product-item__price'>{price.toLocaleString()}원</p>
      </Link>
      <button className='product-item__add-cart' onClick={() => addCart(id)}>
        장바구니 담기
      </button>
    </li>
  );
};

export default ProductItem;
