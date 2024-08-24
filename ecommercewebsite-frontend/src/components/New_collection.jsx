import React from 'react'

// import css
import './New_collection.css';

// import files
import new_collection from '../images/new_collections.js';
// {
//   id: 12,
//   name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//   image: p1_img,
//   new_price: 50.0,
//   old_price: 80.5,
// }
// import subcomponent
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