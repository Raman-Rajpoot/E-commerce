import React, { useState,useContext } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from "react-router-dom";

import product from '../images/product_1.png';
import Navbar from './Navbar'
import './Item.css';
// import css
import MyContext from '../Context/States/Context';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import Buycontext from '../Context/Buy_context/Buy_context';
import LoginContext from '../Context/Login_context/LoginContext';
// import Ccontext from '../Context/Buy_contex/Cart_contex';

const Item = ({productID,productImage,productName,productOldPrice,productNewPrice}) => {
  const Cart= useContext(MyContext);
 const {cartitem,addcartitem} = useContext(Cartcontext)
 const {buyitem,addbuyitem} = useContext(Buycontext)
 const Login_Context = useContext(LoginContext)
  //  console.log(productQuantity);
  const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);
  const [exist, changeExist]= useState(false);
  const showAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 1000); // Hide the alert after 3 seconds
  };

  return (
    
    <div className='Item'>
      <Link to='/product'>
        <img src={productImage} alt="item_image" className='Item_img' onClick={()=>{ addbuyitem({productID,productImage,productName,productOldPrice,productNewPrice})}}/>
        </Link>
        <div className='productDes'> {productName} </div>
        <div className='itemPrice'>
        <div className='itemPrices'>
        <div className='newPrice'> ${productNewPrice} </div>            
        <div className='oldPrice'>${productOldPrice}</div>
        </div>
        <button className='Add_Cart' onClick={()=>{
        //  if(Login_Context.isLogin==null){
        //   return;
        // }

        let isexist=  cartitem.some((item)=>{
             return item.productID===productID;
            
          });
          changeExist(isexist);
          // console.log(isexist)
          if(!isexist){ 
            Cart.changeCounter();
            addcartitem([{productID,productImage,productName,productNewPrice,productOldPrice},...cartitem]);
        }
        showAlert()
        }}>Add Cart</button>

        {isAlertVisible && (
        <div className='alert-container'  style={exist? {backgroundColor:"red"}:{backgroundColor:"green"} }>
          <div className='alert-inner'>{!exist ?"Item added successfully" : "Item already added !"} </div>
        </div>

      )}
        </div>
       
    </div>
  )
  // console.log(productNewPrice)
}

export default Item;