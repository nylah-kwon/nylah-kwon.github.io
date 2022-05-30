import { Resolver } from './types';

const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `http://picsum.photos/id/${i + 20}/450/300`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시설명${i + 1}`,
    createdAt: new Date(1646745501883 + i * 1000 * 60 * 60 * 10).toString(),
  })))();

const productResolover: Resolver = {
  Query: {
    products: (parent, args, centext, info) => {
      return mockProducts;
    },
    product: (parent, { id }, centext, info) => {
      const found = mockProducts.find((item) => item.id === id);
      if (found) return found;
      return null;
    },
  },
};

export default productResolover;
