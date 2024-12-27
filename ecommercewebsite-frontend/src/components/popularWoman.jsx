import React from 'react'

// import css
import './popularWoman.css';

// import component
import Item from './Item';
import data_product from '../images/data';
const popularWoman = () => {
  return (
    <div className='popular_womans_collection'>
      <h2 className='womans_collection_heading'>POPULAR IN WOMAN</h2>
      <div className='womans_collection'>
      {data_product.slice(0, 4).map((product, index) => (
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

export default popularWoman