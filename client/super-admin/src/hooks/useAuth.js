import { useState } from 'react';
import Cookies from "universal-cookie";

// TODO: Set the auth token on to cookies
const cookies = new Cookies();

export default function useAuth() {
  const getAuth = () => {
    const token = cookies.get("TOKEN");
    return token
  };

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = token => {
    cookies.set('TOKEN', token, {path: "/"});
    setAuth(token);
  };

  return {
    setAuth: saveAuth,
    auth
  }
}