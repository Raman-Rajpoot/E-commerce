import React, { useState, useContext } from 'react';
import MyContext from './Context';
const MyState= (props)=>{
  
   const [counter, setCOunter]= useState(0)
   const [product_details, remove]= useState(null)
   const changeCounter= (count=counter+1)=>{
      setCOunter(count);
   }
    return(
            <MyContext.Provider value={{counter, changeCounter}}>
                {props.children}
            </MyContext.Provider>
    );
}

export default MyState;