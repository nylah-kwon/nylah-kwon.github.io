import { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { CartType } from '../../graphql/cart';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoils/cart';
import { useNavigate } from 'react-router-dom';
import CartItem from './item';
import WillPay from '../willPay';

const CartList = ({ items }: { items: CartType[] }) => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);

  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();

  const setAllCheckedFromItems = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;
    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((inputElem) => {
      inputElem.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e?.target as HTMLInputElement;
    if (targetInput && targetInput.classList.contains('select-all')) {
      setItemsCheckedFromAll(targetInput);
    } else {
      setAllCheckedFromItems();
    }
    const data = new FormData(formRef.current);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (checkedCartData.length) {
      navigate('/payment');
    } else {
      alert('결제할 대상이 없습니다.');
    }
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRefs.find((ref) => ref.current!.dataset.id === item.id);
      if (itemRef) itemRef.current!.checked = true;
    });
    setAllCheckedFromItems();
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);
    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input className='select-all' name='select-all' type='checkbox' />
          전체선택
        </label>
        <ul className='cart'>
          {items.map((item, i) => (
            <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
          ))}
        </ul>
      </form>
      <WillPay submitTitle='결제페이지로 이동' handleSubmit={handleSubmit}></WillPay>
    </div>
  );
};

export default CartList;
