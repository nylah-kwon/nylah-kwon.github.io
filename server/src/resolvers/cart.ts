import {
  doc,
  collection,
  DocumentData,
  getDoc,
  getDocs,
  where,
  query,
  updateDoc,
  increment,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Product, Resolver } from './types';

const cartResolver: Resolver = {
  Query: {
    cart: async (parent, args) => {
      const cart = collection(db, 'cart');
      const snapshot = await getDocs(cart);
      const data: DocumentData[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      return data;
    },
  },
  Mutation: {
    addCart: async (parent, { productId }) => {
      if (!productId) throw Error('상품 id가 없습니다.');

      const productRef = doc(db, 'products', productId);
      const cartCollection = collection(db, 'cart');
      if (!productRef) throw new Error('없는 상품입니다.');

      const exist = (await getDocs(query(cartCollection, where('product', '==', productRef))))
        .docs[0];

      let cartRef;
      if (exist) {
        //cartRef = doc(db, 'cart', exist.id);
        cartRef = exist.ref;
        await updateDoc(cartRef, {
          amount: increment(1),
        });
      } else {
        cartRef = await addDoc(cartCollection, {
          amount: 1,
          product: productRef,
        });
      }
      const snapshot = await getDoc(cartRef);
      return {
        ...snapshot.data(),
        productRef: productRef,
        id: snapshot.id,
      };
    },
    updateCart: async (parent, { cartId, amount }) => {
      if (amount < 1) throw Error('1 이하로 바꿀 수 없습니다.');
      const cartRef = doc(db, 'cart', cartId);
      if (!cartRef) throw Error('장바구니 정보가 없습니다.');
      await updateDoc(cartRef, { amount });
      const snapshot = await getDoc(cartRef);
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },
    deleteCart: async (parent, { cartId }) => {
      const cartRef = doc(db, 'cart', cartId);
      if (!cartRef) throw Error('장바구니 정보가 없습니다.');
      await deleteDoc(cartRef);
      return cartId;
    },
    executePay: async (parent, { ids }) => {
      const deleted = [];
      for await (const id of ids) {
        const cartRef = doc(db, 'cart', id);
        const cartSnapshot = await getDoc(cartRef);
        const cartData = cartSnapshot.data();
        const productRef = cartData?.product;
        if (!productRef) throw new Error('상품 정보가 없습니다.');
        const product = (await getDoc(productRef)).data() as Product;
        if (product.createdAt!) {
          await deleteDoc(cartRef);
          deleted.push(id);
        }
      }
      return deleted;
    },
  },
  CartItem: {
    product: async (cartItem, args) => {
      const product = await getDoc(cartItem.product);
      const data = product.data() as any;
      return {
        ...data,
        id: product.id,
      };
    },
  },
};

export default cartResolver;
