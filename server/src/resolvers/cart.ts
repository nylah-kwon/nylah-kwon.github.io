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

let cartData = [
  { id: '1', amount: 2 },
  { id: '3', amount: 4 },
];

const cartResolver: Resolver = {
  Query: {
    cart: () => {
      return cartData;
    },
  },
  Mutation: {
    addCart: (parent, { id }, centext, info) => {
      const newCartData = { ...cartData };
      const targetProduct = mockProducts.find((item) => item.id === id);

      if (!targetProduct) {
        throw new Error('상품이 없습니다!');
      }

      const newItem = {
        ...targetProduct,
        amount: (newCartData[id]?.amount || 0) + 1,
      };
      newCartData[id] = newItem;
      cartData = newCartData;
      return newItem;
    },
    updateCart: (parent, { id, amount }, centext, info) => {
      const newData = { ...cartData };
      if (!newData[id]) {
        throw new Error('없는 데이터입니다.');
      }
      const newItem = {
        ...newData[id],
        amount,
      };
      newData[id] = newItem;
      cartData = newData;
      return newItem;
    },
    deleteCart: (parent, { id }, centext, info) => {
      const newData = { ...cartData };
      delete newData[id];
      cartData = newData;
      return id;
    },
    executePay: (parent, { ids }, centext, info) => {
      const newCartData = cartData.filter((cartItem) => !ids.includes(cartItem.id));
      cartData = newCartData;
      return ids;
    },
  },
};

export default cartResolver;
