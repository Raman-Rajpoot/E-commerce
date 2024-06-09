import React, {useState} from 'react'
import LoginContext from './LoginContext';

function LoginContextProvider({children}) {
    const [isLogin, setLogin]= useState(null);
    const addLogin= (person)=>{
      setLogin(person)
    }
  return (
    <LoginContext.Provider value={{isLogin, addLogin}}>
       {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider;