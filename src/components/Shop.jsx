import React from 'react'
import { ReactDOM } from 'react';

// import css
import './Shop.css';

// import images
import Hero  from '../images/hero_image.png';
export const Shop = () => {
  return (
    <div className='Shop'>
     <div className='ShopText'>
      <p className='shopText1'>New arrivals only </p>
      <p className='shopText2'>new 🔥 collection for everyone</p>
      <button className='shopBtn'>Buy Now</button>    
     </div>   
     <img src={Hero} alt="image" className='Shop_img'/>
    </div>
  )
}

export default Shop;