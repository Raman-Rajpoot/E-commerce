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
             <Item productID={data_product[25].id} productImage={data_product[25].image} productName={data_product[25].name} productOldPrice={data_product[25].old_price} productNewPrice={data_product[25].new_price}/>

              <Item productID={data_product[26].id} productImage={data_product[26].image} productName={data_product[26].name} productOldPrice={data_product[26].old_price} productNewPrice={data_product[26].new_price}/>

              <Item productID={data_product[27].id} productImage={data_product[27].image} productName={data_product[27].name} productOldPrice={data_product[27].old_price} productNewPrice={data_product[27].new_price}/>

              <Item productID={data_product[28].id} productImage={data_product[28].image} productName={data_product[28].name} productOldPrice={data_product[28].old_price} productNewPrice={data_product[28].new_price} />
            
             </div>
        </div>
      )
}

export default popularInKids;