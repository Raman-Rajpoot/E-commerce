import React, { useContext, useState, useEffect } from 'react';
import Buycontext from '../Context/Buy_context/Buy_context';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import MyContext from '../Context/States/Context';
import cashOndly from '../images/cash0ndl.png';
import freedlvry from '../images/free_shipping.png';
import minus from '../images/minus.png';
import new_collection from '../images/new_collections.js';
import plus from '../images/plus.png';
import replacement from '../images/replacement.png';
import starIcon from '../images/star_icon.png';
import Item from './Item.jsx';
import Alert from './Alert.jsx';
import { useNavigate } from 'react-router-dom';
import './ProductBuy.css';
import ReviewPage from './ReviewPage.jsx';
import LoginContext from '../Context/Login_context/LoginContext.js';

function ProductBuy() {
  const { buyitem, addbuyitem } = useContext(Buycontext);
  const { cartitem, addCartItem } = useContext(Cartcontext);
  const Cart = useContext(MyContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [exist, setExist] = useState(false);
  const [item, setItem] = useState(buyitem || JSON.parse(localStorage.getItem('buyitem')));
  const Login_Context = useContext(LoginContext);
  useEffect(() => {
    if (buyitem) {
      setItem(buyitem);
    }
  }, [buyitem]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!Login_Context.user?.email) {
      navigate('/login');  
      return;
    }
  }, []);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === 'increment' && prev < 9) return prev + 1;
      if (type === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const showAlert = (isExist) => {
    setExist(isExist);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 1000);
  };

  if (!item) return <div className="empty">Product not found</div>;

  const totalPrice = item.productNewPrice * quantity;

  return (
    <div>
      <div className="pt">
        <div className="productImg">
          <img src={item.productImage} alt="img" />
        </div>
        <div className="pt2">
          <div className="desc">{item.productName}</div>

          <div className="rating">
            <div>
              {[...Array(4)].map((_, i) => (
                <img key={i} src={starIcon} alt="star" />
              ))}
            </div>
            <div>4.0</div>
          </div>

          <div className="price">
            <div className="oldPrice">${item.productOldPrice}</div>
            <div className="newPrice">${item.productNewPrice}</div>
          </div>

          {/* Policies */}
          <div className="policy">
            <div className="replacement">
              <img src={replacement} alt="img" />
              <div>7 days replacement policy</div>
            </div>
            <div className="delivery">
              <img src={freedlvry} alt="img" />
              <div>Free delivery</div>
            </div>
            <div className="securedTransitions">
              <img src={cashOndly} alt="img" />
              <div>Secured Transactions</div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="size">
            <div className="size-label">Size :</div>
            <select name="Sizes" id="sizeSelector">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="pt3">
          <div className="cal">
            <div className="quantity-label">Quantity :</div>
            <div className="quantity">
              <img
                src={plus}
                alt="plus"
                className="plus"
                onClick={() => handleQuantityChange('increment')}
              />
              <div>{quantity}</div>
              <img
                src={minus}
                alt="minus"
                className="minus"
                onClick={() => handleQuantityChange('decrement')}
              />
            </div>

            <div className="tprice">
              <div className="tprice-label">Total Price :</div>
              <div className="tprice-amt">${totalPrice}</div>
            </div>
          </div>

          <div className="btns">
            <button className="buybtn" onClick={() => navigate('/payment', { state: { totalPrice } })}>
              BUY
            </button>

            <button
              className="cartbtn"
              onClick={() => {
                const isExist = cartitem.some(
                  (cartItem) => cartItem.productID === item.productID
                );
                if (!isExist) {
                  Cart.changeCounter();
                  addCartItem([item, ...cartitem]);
                }
                showAlert(isExist);
              }}
            >
              ADD TO CART
            </button>

            {isAlertVisible && <Alert exist={exist} />}
          </div>
        </div>
      </div>

      <hr className="hr" />
      <ReviewPage />
    </div>
  );
}

export default ProductBuy;
