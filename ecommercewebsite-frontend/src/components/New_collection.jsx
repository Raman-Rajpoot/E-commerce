import React from 'react'
import './New_collection.css';
import new_collection from '../images/new_collections.js';

import Item from './Item.jsx';

const New_collection = () => {
  return (
    <div className='New_Collection'>
        <h2 className='New_collection_heading'> New Collection </h2>
        <div className='New_Collection_item'>
    { new_collection.map((item,index) =>{
     return ( <Item key={index} productID={item.id} productImage={item.image} productName={item.name} 
        productOldPrice={item.old_price} productNewPrice={item.new_price} className="New_items"/>);
}) }
    </div>
     </div>
  )
}

export default New_collection;