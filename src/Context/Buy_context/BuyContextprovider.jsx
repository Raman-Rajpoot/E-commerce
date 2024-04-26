import React, {useState} from 'react'
import Buycontext from './Buy_context.js';

function BuyContextprovider({children}) {
    const [buyitem, addbuyitem]= useState(null);
  return (
    <Buycontext.Provider value={{buyitem, addbuyitem}}>
       {children}
    </Buycontext.Provider>
  )
}

export default BuyContextprovider;