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
          <Item productID={data_product[0].id} productImage={data_product[0].image} productName={data_product[0].name} productOldPrice={data_product[0].old_price} productNewPrice={data_product[0].new_price} />

         <Item productID={data_product[1].id} productImage={data_product[1].image} productName={data_product[1].name} productOldPrice={data_product[1].old_price} productNewPrice={data_product[1].new_price} />

         <Item productID={data_product[2].id} productImage={data_product[2].image} productName={data_product[2].name} productOldPrice={data_product[2].old_price} productNewPrice={data_product[2].new_price} />

         <Item productID={data_product[3].id} productImage={data_product[3].image} productName={data_product[3].name} productOldPrice={data_product[3].old_price} productNewPrice={data_product[3].new_price} />
      </div>
    </div>
  )
}

export default popularWoman