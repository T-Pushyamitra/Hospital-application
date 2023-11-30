import { useState } from 'react';
import Cookies from "universal-cookie";

// TODO: Set the user on to cookies
const cookies = new Cookies();

export default function useUser() {
  const getUser = () => {
    const user = cookies.get("USER");
    return user
  };

  const [user, setUser] = useState(getUser());

  const saveUser = user => {
    const dateOfBirth = new Date(user.dateOfBirth);
    var twoDigitMonth=((dateOfBirth.getMonth()+1)>=10)? (dateOfBirth.getMonth()+1) : '0' + (dateOfBirth.getMonth()+1);  
    var twoDigitDate=((dateOfBirth.getDate())>=10)? (dateOfBirth.getDate()) : '0' + (dateOfBirth.getDate());
    user.dateOfBirth = dateOfBirth.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
    cookies.set('USER', user, {path: "/"});
    setUser(user);
  };

  return {
    setUser: saveUser,
    user
  }
}