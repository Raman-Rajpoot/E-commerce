import React from 'react'
import './AllProduct.css';
// import product
import all_product from '../../images/all_product';
import Item from '../Item';
const Female = () => {
  return (
    <div className='products'>
         { all_product.map((item) =>{
          if(item.category=="women"){
          return ( <Item  productID={item.id} productImage={item.image} productName={item.name} 
        productOldPrice={item.old_price} productNewPrice={item.new_price} className="New_items"/>);
          }
}) }
              </div>
  )
}

export default Female;