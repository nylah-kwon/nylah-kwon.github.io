import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import ProductDetail from '../../components/product/datail';
import { GET_PRODUCT, Product } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () => graphqlFetcher(GET_PRODUCT, { id }));

  if (!data) return null;

  return (
    <div>
      <h3>상품상세</h3>
      <ProductDetail item={data}></ProductDetail>
    </div>
  );
};

export default ProductDetailPage;
