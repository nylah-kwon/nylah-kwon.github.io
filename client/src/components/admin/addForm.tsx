import { SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { ADD_PRODUCT, MutableProduct, Product } from '../../graphql/products';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import arrToObj from '../../util/arrToObj';

const AddForm = () => {
  const queryClient = getClient();
  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    addProduct(formData as MutableProduct);
  };

  return (
    <form className='product-item__add' onSubmit={handleSubmit}>
      <p className='top'>새로운 상품 추가</p>
      <div className='product-item__edit'>
        <p>상품명</p>
        <input name='title' type='text' required />
      </div>
      <div className='product-item__edit'>
        <p>이미지URL</p>
        <input name='imageUrl' required />
      </div>
      <div className='product-item__edit'>
        <p>상품가격</p>
        <input name='price' type='number' required min='1000' />
      </div>
      <div className='product-item__edit'>
        <p>상세</p>
        <input name='description' />
      </div>
      <button className='product-item__save-cart' type='submit'>
        추가하기
      </button>
    </form>
  );
};

export default AddForm;
