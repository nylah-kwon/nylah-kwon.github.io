import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import GoogleLoginButton from './login/googleLoginButton';
const Gnb = () => {
  console.log(window.location.pathname);
  return (
    <nav className='nav'>
      <div className='logo'>
        <span>Nylah</span>
        <span className='bold'>Shop</span>
      </div>
      <div className='menu'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'link__active' : 'link')}>
          메인화면
        </NavLink>
        <NavLink to='/products' className={({ isActive }) => (isActive ? 'link__active' : 'link')}>
          상품목록
        </NavLink>
        <NavLink to='/cart' className={({ isActive }) => (isActive ? 'link__active' : 'link')}>
          장바구니
        </NavLink>

        <NavLink to='/admin' className={({ isActive }) => (isActive ? 'link__active' : 'link')}>
          상품관리
        </NavLink>
      </div>
      <div className='login'>
        <GoogleLoginButton />
      </div>
    </nav>
  );
};
export default Gnb;
