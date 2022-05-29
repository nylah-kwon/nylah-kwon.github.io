import { ReactChild } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: { children: ReactChild }) => {
  return createPortal(children, document.getElementById('modal')!);
};

const PaymentModal = ({
  show,
  proceed,
  cancel,
}: {
  show: boolean;
  proceed: () => void;
  cancel: () => void;
}) => {
  return show ? (
    <ModalPortal>
      <div className={`modal ${show ? 'show' : ''}`}>
        <div className='modal__inner'>
          <p>결제하시겠습니까?</p>
          <div>
            <button className='modal__inner__button' onClick={proceed}>
              확인
            </button>
            <button className='modal__inner__button' onClick={cancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  ) : null;
};
export default PaymentModal;
