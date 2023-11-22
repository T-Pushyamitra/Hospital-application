import { useState } from 'react';

export default function useAuth() {
  const getAuth = () => {
    const authString = localStorage.getItem('auth');
    const userAuth = JSON.parse(authString);
    return userAuth?.auth
  };

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = userAuth => {
    localStorage.setItem('auth', JSON.stringify(userAuth));
    setAuth(userAuth.auth);
  };

  return {
    setAuth: saveAuth,
    auth
  }
}