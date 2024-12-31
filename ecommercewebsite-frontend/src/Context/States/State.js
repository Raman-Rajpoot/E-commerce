import React, { useState, useEffect } from 'react';
import MyContext from './Context';

const MyState = (props) => {
  const [counter, setCounter] = useState(() => {
    return parseInt(localStorage.getItem('counter')) || 0;
  });

  const changeCounter = (count = counter + 1) => {
    setCounter(count);
    
  };

  return (
    <MyContext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
