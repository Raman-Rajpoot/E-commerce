import React, { useState,useContext } from 'react'
import replacement from '../images/replacement.png'
import cashOndly from '../images/cash0ndl.png'
import freedlvry from '../images/free_shipping.png'
import starIcon from '../images/star_icon.png'
import plus from '../images/plus.png'
import minus from '../images/minus.png'
import Buycontext from '../Context/Buy_context/Buy_context';
import MyContext from '../Context/States/Context';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import './ProductBuy.css'
import Item from './Item.jsx'
import new_collection from '../images/new_collections.js';
function ProductBuy() {
  const {buyitem,addbuyitem} = useContext(Buycontext)
  const {cartitem,addcartitem} = useContext(Cartcontext)
  const Cart= useContext(MyContext);
  
  const [quantity,setquantity]= useState(1);
  return (buyitem==null ?<div className='empty'></div> : (
    <div>
     <div className='pt'>
       <div className='productImg'>
         <img src={buyitem.productImage} alt="img" />
       </div>
       <div className='pt2'>
         <div className="desc">
           {buyitem.productName}
         </div>
         <div className="rating">
          <div>
            <img src={starIcon} alt="" />
            <img src={starIcon} alt="" />
            <img src={starIcon} alt="" />
            <img src={starIcon} alt="" />
          </div>
          <div>4.0 </div>
         </div>
         <div className='price'>
         <div className='oldPrice'>
           ${buyitem.productOldPrice}
         </div>
         <div className="newPrice">
            ${buyitem.productNewPrice}
         </div>
         </div>
         <div className='policy'>
              <div className='replacement'>
                     <img src={replacement} alt="img" />
                     <div>7 days replacement policy</div>
              </div>
              <div className='delivery'>
                  <img src={freedlvry} alt="img" />
                  <div>Free delivery</div>
              </div>
              <div className='securedTransitions'>
                     <img src={cashOndly} alt="img" />
                     <div>secured Transitions</div>
              </div>
              {/* <div className='refund'>
                     <img src="" alt="" />
                     <div></div> */}
              {/* </div> */}
        </div>
        <div className='size'>
          <div className='size-label'>Size :</div>
          <select name="Sizes" id="sizeSelector">
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="XL">XL</option>
            <option value="S">S</option>
          </select>
        </div>
        <div className="productDetail">

        </div>
        </div>
        <div className='pt3'>
          <div className="cal">
          <div className='quantity-label'>Quantity : </div>
          <div className='quantity'>
            <img src={plus} alt="img-inc" className='plus' onClick={()=>{if(quantity<9)setquantity(quantity+1)}}/>
            <div>{quantity}</div>
            <img src={minus} alt="img-dec" className='minus' onClick={()=>{
              if(quantity>1){
                 setquantity(quantity-1)
            }
              }}/>
          </div>

          <div className='tprice'>
          <div className='tprice-label'> Total Price : </div>
           <div className='tprice-amt'> ${buyitem.productNewPrice * quantity}</div>
          </div>
          </div>
          <div className='btn'>
            <button className='buybtn' onClick={()=>{alert('YOUR ORDER PLACED')}}>BUY</button> <br />
            <button className='cartbtn'  onClick={()=>{
                 let isexist=  cartitem.some((item)=>{
                      return item.productID===buyitem.productID;
                   });
       // console.log(isexist)
                if(!isexist){ 
                     Cart.changeCounter();
                     addcartitem([buyitem,...cartitem]);
                   }
              }}>ADD TO CART</button>
          </div>
        </div>
     </div> 
     <hr className='hr'/>
     {/* <div className='suggestion-label'> Suggestions : </div> */}
       <div className='suggestion'>
       { new_collection.map((item,index) =>{
     return ( <Item key={index} productID={item.id } productImage={item.image} productName={item.name} 
        productOldPrice={item.old_price} productNewPrice={item.new_price} className="New_items"/>);
}) }
        </div> 
    </div>
  ))
}

export default ProductBuy;