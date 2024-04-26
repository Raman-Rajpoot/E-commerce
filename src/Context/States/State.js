import React, { useState, useContext } from 'react';
import MyContext from './Context';
const MyState= (props)=>{
  
   const [counter, setCOunter]= useState(0)
   const [product_details, remove]= useState(null)
   const changeCounter= ()=>{
      setCOunter(counter+1);
   }
    return(
            <MyContext.Provider value={{counter, changeCounter}}>
                {props.children}
            </MyContext.Provider>
    );
}

export default MyState;