import React, { useEffect, useState } from 'react'
import { ReactDOM } from 'react';

// import css
import './Shop.css';

// import images
import Hero  from '../images/hero_image.png';
export const Shop = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='Shop'>
     <div className='ShopText'>
      <p className='shopText1'>New arrivals only </p>
      <p className='shopText2'>new 🔥 collection for everyone</p>
      <button className='shopBtn'>Buy Now</button>    
     </div>
        
     {windowWidth > 600 && <img src={Hero} alt="image" className="Shop_img" />}
    </div>
  )
}

export default Shop;