import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../../recoils/login';

const GoogleLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [name, setName] = useState('');
  let username = '';
  const onSocialClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const target = event.target as HTMLButtonElement; //
    if (target.name === 'google') {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          console.log(result.user);
          setIsLoggedIn(true);

          if (result.user.displayName) {
            setName(result.user.displayName);
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <button className='login__button'>{name}</button>
      ) : (
        <button className='login__button' onClick={onSocialClick} name='google'>
          로그인
        </button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
