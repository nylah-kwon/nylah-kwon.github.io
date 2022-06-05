import { SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { DELETE_PRODUCT, MutableProduct, Product, UPDATE_PRODUCT } from '../../graphql/products';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import arrToObj from '../../util/arrToObj';

const AdminItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
  isEditing,
  startEdit,
  doneEdit,
}: Product & {
  isEditing: boolean;
  startEdit: () => void;
  doneEdit: () => void;
}) => {
  const queryClient = getClient();
  const { mutate: updateProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphqlFetcher(UPDATE_PRODUCT, { id, title, imageUrl, price, description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });
        doneEdit();
      },
    }
  );

  const { mutate: deleteProduct } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_PRODUCT, { id }),
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
    updateProduct(formData as MutableProduct);
  };

  const deleteItem = () => {
    deleteProduct({ id });
  };

  if (isEditing)
    return (
      <li className='product-item'>
        <form onSubmit={handleSubmit}>
          <p className='top'>상품 정보 수정</p>
          <div className='product-item__edit'>
            <p>상품명</p>
            <input name='title' type='text' required defaultValue={title} />
          </div>
          <div className='product-item__edit'>
            <p>이미지URL</p>
            <input name='imageUrl' required defaultValue={imageUrl} />
          </div>
          <div className='product-item__edit'>
            <p>상품가격</p>
            <input name='price' type='number' required min='1000' defaultValue={price} />
          </div>
          <div className='product-item__edit'>
            <p>상세</p>
            <input name='description' defaultValue={description} />
          </div>
          <button className='product-item__save-cart' type='submit'>
            저장
          </button>
        </form>
      </li>
    );
  return (
    <li className='product-item'>
      <Link to={`/products/${id}`}>
        <img className='product-item__image' src={imageUrl} />
        <p className='product-item__title'>{title}</p>
        <p className='product-item__price'>{price.toLocaleString()}원</p>
      </Link>
      {!createdAt && <span>삭제된 상품</span>}
      <button className='product-item__edit-cart' onClick={startEdit}>
        수정
      </button>
      <button className='product-item__delete-cart' onClick={deleteItem}>
        삭제
      </button>
    </li>
  );
};

export default AdminItem;
