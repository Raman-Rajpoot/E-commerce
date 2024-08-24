import React, {useContext, useState} from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from "react-router-dom";
import './One_cart.css'
import data_product from '../images/data'
import cross from '../images/cart_cross_icon.png';
import MyContext from '../Context/States/Context';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
// import Cartcontext from '../Context/Cart_contex/Cart_contex';
import Buycontext from '../Context/Buy_context/Buy_context';

// key,img,title,price,quantity
function One_cart(item) {
  const {cartitem,addcartitem} = useContext(Cartcontext);
  const {buyitem,addbuyitem} = useContext(Buycontext);
  const Cart = useContext(MyContext)
  console.log(item.id)
   const RemoveItem=(id)=>{
   console.log("removing id:",id,cartitem)
    const update = cartitem.filter((e)=>{
        return e.productID != id ;
     });
    console.log('updates ',update)
     addcartitem(update);

   }
   
  return (
    <div className='closs'>
<Link to='/product' style={{textDecoration:"none" } }>
    <div className='cart-row' >
    
        <img src={item.img} alt="cart-item" className='product-item-img' onClick={()=>{ addbuyitem({productID:item.key ,productImage:item.img,productName:item.title,oldPrice: item.OldPrice,productNewPrice:item.price})}}/>

        <div className='cart-title' onClick={()=>{ addbuyitem({productID:item.key,productImage:item.img,productName:item.title,oldPrice: item.OldPrice,productNewPrice:item.price})}}>
            {item.title}
        </div>

        <div onClick={()=>{ addbuyitem({productID:item.key,productImage:item.img,productName:item.title,oldPrice: item.OldPrice,productNewPrice:item.price})}}>     {item.price} 
        </div>
       
       
    </div>
    </Link>
    <img src={cross} alt="Remove" className='remove-icon'  onClick={()=>{
Cart.changeCounter(Cart.counter-1);
    RemoveItem(item.id)
    }
    }/>
    </div>
  )


}

export default One_cart