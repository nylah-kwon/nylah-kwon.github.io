import { useRecoilValue } from 'recoil';
import { checkedCartState } from '../../recoils/cart';
import { useNavigate } from 'react-router-dom';
import ItemData from '../cart/itemData';
import { SyntheticEvent } from 'react';

const WillPay = ({
  submitTitle,
  handleSubmit,
}: {
  submitTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}) => {
  const navigate = useNavigate();
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce((res, { product: { price }, amount }) => {
    res += price * amount;
    return res;
  }, 0);

  return (
    <div className='cart-willpay'>
      <ul>
        {checkedItems.map(({ product: { imageUrl, price, title }, id, amount }) => (
          <li key={id}>
            <ItemData imageUrl={imageUrl} price={price} title={title} />

            <p>수량 : {amount}개</p>
            <p>금액 : {(price * amount).toLocaleString()}원</p>
          </li>
        ))}
      </ul>
      <p className='cart-willpay__totalPrice'>총 예상 결제 금액: {totalPrice.toLocaleString()}원</p>
      <div>
        <button className='cart-willpay__button' onClick={handleSubmit}>
          {submitTitle}
        </button>
      </div>
    </div>
  );
};

export default WillPay;
