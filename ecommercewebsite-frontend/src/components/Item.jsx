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

const Item = ({
  productID,
  productImage,
  productName,
  productOldPrice,
  productNewPrice,
}) => {
  const {counter, changeCounter} = useContext(MyContext);
  const { cartitem, addCartItem } = useContext(Cartcontext);
  const { buyitem, addbuyitem } = useContext(Buycontext);
  const Login_Context = useContext(LoginContext);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCartUpdating, setIsCartUpdating] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000); // Hide the alert after 3 seconds
  };

  async function addCart(product) {
    if (isCartUpdating) {
      console.log('Cart is updating, please wait...');
      return;
    }

    setIsCartUpdating(true);
    try {
      const prdt = {
        productId: product.productID,
        productName: product.productName,
        productImage: product.productImage,
        productPrice: product.productNewPrice,
        productOldPrice: product.productOldPrice || 0,
        rating: product.rating || 0.0,
        stock: product.stock || 3,
        category: product.category || 'kids',
      };

      let existingItemIndex = await cartitem.some((item) => {
        return item.productId == product.productID;
      });

      setExist(existingItemIndex);
      if (existingItemIndex) {
        setIsCartUpdating(false);
        return -1;
      }

      const response = await fetch('http://localhost:7000/api/v1/user/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prdt),
        credentials: 'include', // Ensure cookies are sent with the request
      });
      setIsCartUpdating(false);
      console.log('PRODUCT:: ', prdt);
      if (response.ok) {
        const data = await response.json();
        addCartItem(data.data);
        changeCounter(counter+1)
        console.log(counter)
        console.log('Product added to cart:', data.data);
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      setIsCartUpdating(false);
    }
  }

  return (
    // {
    //   id: 12,
    //   name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    //   image: p1_img,
    //   new_price: 50.0,
    //   old_price: 80.5,
    // }
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
      
          // console.log(isexist)
          
            addCart(product={productID,productImage,productName,productNewPrice,productOldPrice});
        
        showAlert()
        }}>Add Cart</button>

        {isAlertVisible && (
        <div className='alert-container'  style={exist? {backgroundColor:"red"}:{backgroundColor:"green"} }>
          <div className='alert-inner'>{isCartUpdating ? "Cart is Updating, Wait.....":!exist ?"Item added successfully" : "Item already added !"} </div>
        </div>

      )}
        </div>
       
    </div>
  )
  // console.log(productNewPrice)
}

export default Item;