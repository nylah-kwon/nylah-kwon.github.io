import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDv3O7JeMnv0m4Pk_y_4kfG0DIDurRDacA',
  authDomain: 'nylah-shop.firebaseapp.com',
  projectId: 'nylah-shop',
  storageBucket: 'nylah-shop.appspot.com',
  messagingSenderId: '619916211032',
  appId: '1:619916211032:web:87400e167f8f4754aaab2d',
};

export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
