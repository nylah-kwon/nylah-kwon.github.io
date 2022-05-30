import { useQuery } from 'react-query';
import ProductItem from '../../components/product/item';
import ProductList from '../../components/product/list';
import GET_PRODUCTS, { Products } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const ProductListPage = () => {
  const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS));
  return (
    <div>
      <ProductList list={data?.products || []} />
    </div>
  );
};

export default ProductListPage;
