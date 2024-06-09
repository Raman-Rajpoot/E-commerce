import React ,{useContext,useEffect} from 'react'
import One_cart from './One_cart';
import MyContext from '../Context/States/Context';
import './Add_cart.css'
// import Cart_context from '../Context/Cart_contex/Cart_contex';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import Buycontext from '../Context/Buy_context/Buy_context';
function Add_cart() {
   const {setcartitem,cartitem} = useContext(Cartcontext); 
   const {buyitem,addbuyitem} = useContext(Buycontext)
 
  // useEffect(()=>{
  //   console.log("chanedfasdfsdfn adfnasdkfl dlkansdfbjads ,sdcadsf")
  //   console.log(cartitem)
  // },[cartitem])
  // console.log("hello aftewr:",cartitem[0].productName)
  // console.log(cartitem);
  
  return (
    <div className='cart-page'>
        <h2 className='myCart-label'>My Cart</h2>
        <div className='title-row'>
             <div>Product</div>
              <div style={{width:'45%'}}>
                Title
             </div>
        
             <div >price</div>
             <div>Remove</div>
             </div>
             <div className="hr"></div>
             <div>
             {cartitem.map((item, index) => (
              
                 <One_cart
                    key={item.productID}
                    id={item.productID}
                    img={item.productImage}
                    title={item.productName}
                    price={item.productNewPrice} 
                    oldPrice={item.productOldPrice}
                 />
          
        ))}
             
             </div>
    </div>
  )
}

export default Add_cart;