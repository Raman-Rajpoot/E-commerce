import React, { useState, useEffect } from 'react';
import MyContext from './Context';

const MyState = (props) => {
  // Initialize counter with value from localStorage or default to 0
  const [counter, setCounter] = useState(() => {
    return parseInt(localStorage.getItem('counter')) || 0;
  });

  const changeCounter = (count = counter + 1) => {
    setCounter(count);
    // localStorage.setItem('counter', count); // Save to localStorage
  };

  return (
    <MyContext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
