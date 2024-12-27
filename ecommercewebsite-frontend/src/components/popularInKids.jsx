import React from 'react'
import { ReactDOM } from 'react';
//import css
import './popularInKids.css';

// import Subcomponent
import Item from './Item';
import data_product from '../images/all_product.js';

const popularInKids = () => {
   
    return (
       
        <div className='popular_Kids_collection'>
          <h2 className='Kids_collection_heading'>Trending In Kids</h2>
          <div className='Kids_collection'>
               {data_product.slice(25, 29).map((product, index) => (
    <Item
      key={index} 
      productID={product.id}
      productImage={product.image}
      productName={product.name}
      productOldPrice={product.old_price}
      productNewPrice={product.new_price}
      category={product.category} 
      stock={product.stock} 
    />
  ))}
</div>

        </div>
      )
}

export default popularInKids;