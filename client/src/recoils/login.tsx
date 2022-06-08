import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'loginState',
  default: false,
});
