import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { checkedCartState } from '../../recoils/cart';
import { useNavigate } from 'react-router-dom';
import WillPay from '../willPay';
import PaymentModal from './modal';
import { graphqlFetcher } from '../../queryClient';
import { EXECUTE_PAY } from '../../graphql/payment';

type PayInfo = {
  id: string;
  amount: number;
};

type PaymentInfos = PayInfo[];

const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
  const [modalShown, toggleModal] = useState(false);
  const { mutate: excutePay } = useMutation((payInfos: PaymentInfos) =>
    graphqlFetcher(EXECUTE_PAY, payInfos)
  );

  const showModal = () => {
    toggleModal(true);
  };

  const proceed = () => {
    const payInfos = checkedCartData.map(({ id, amount }) => ({ id, amount }));
    excutePay(payInfos);
    setCheckedCartData([]);
    navigate('/products', { replace: true });
  };

  const cancel = () => {
    toggleModal(false);
  };

  return (
    <div>
      <WillPay submitTitle='결제하기' handleSubmit={showModal} />
      <PaymentModal show={modalShown} proceed={proceed} cancel={cancel}></PaymentModal>
    </div>
  );
};

export default Payment;
