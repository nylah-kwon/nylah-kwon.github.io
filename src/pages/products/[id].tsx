import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import ProductDetail from '../../components/product/datail';
import ProductItem from '../../components/product/item';
import { fetcher, QueryKeys } from '../../queryClient';
import { Product } from '../../type';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: 'GET',
      path: `/products/${id}`,
    })
  );

  if (!data) return null;

  return (
    <div>
      <h3>상품상세</h3>
      <ProductDetail item={data}></ProductDetail>
    </div>
  );
};

export default ProductDetailPage;
