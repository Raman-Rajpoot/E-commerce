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
  const { buyitem } = useContext(Buycontext);
  const { cartitem, addCartItem } = useContext(Cartcontext);
  const Cart = useContext(MyContext);
  const navigate = useNavigate();
  const Login_Context = useContext(LoginContext);

  const [item, setItem] = useState(buyitem || JSON.parse(localStorage.getItem('buyitem')));
  const [quantity, setQuantity] = useState(1);
  const [isCartPresent, setIsCartPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [exist, setExist] = useState(false);
  const { counter, changeCounter } = useContext(MyContext);

  //  Redirect if not logged in
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!Login_Context.user?.email) {
      navigate('/login');
    }
  }, [Login_Context.user, navigate]);

  //  Update local item when buyitem changes
  useEffect(() => {
    if (buyitem) setItem(buyitem);
  }, [buyitem]);

  //  Fetch the cart on mount, sync context & button state
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://ecommerce-backend-j9hr.onrender.com/api/v1/user/getCart', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (res.ok) {
          addCartItem(data.cart); // replace your cart context with server data
          const found = data.cart.some(ci => ci.productID === item.productID);
          setIsCartPresent(found);
        } else {
          console.error('Fetch cart failed:', data.message);
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };
    if (item?.productID) fetchCart();
  }, [item, addCartItem]);

  // Quantity controls
  const handleQuantityChange = type =>
    setQuantity(q => {
      if (type === 'increment' && q < 9) return q + 1;
      if (type === 'decrement' && q > 1) return q - 1;
      return q;
    });

  // Alert helper
  const showAlert = wasExist => {
    setExist(wasExist);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 1200);
  };

  // Add to Cart
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const prdt = {
        productId: item.productID,
        productName: item.productName,
        productImage: item.productImage,
        productPrice: item.productNewPrice,
        productOldPrice: item.productOldPrice || 0,
        rating: 0.0,
        stock: item.stock || 1,
        category: item.category || 'kids',
      };
      const res = await fetch('https://ecommerce-backend-j9hr.onrender.com/api/v1/user/addCart', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prdt),
      });
      const data = await res.json();
      if (res.ok) {
        addCartItem(data.data);
        changeCounter(counter + 1);
        setIsCartPresent(true);
        showAlert(false); // false = just added
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      showAlert(true);
    } finally {
      setLoading(false);
    }
  };

  //  Remove from Cart
  const handleRemoveFromCart = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://ecommerce-backend-j9hr.onrender.com/api/v1/user/removecart', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productID: item.productID }),
      });
      const data = await res.json();
      if (res.ok) {
        addCartItem(data.cart);
        changeCounter(Math.max(0, counter - 1));
        setIsCartPresent(false);
        showAlert(true); // true = removed
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Remove cart error:', err);
      showAlert(true);
    } finally {
      setLoading(false);
    }
  };

  if (!item) return <div className="empty">Product not found</div>;

  const totalPrice = item.productNewPrice * quantity;

  return (
    <div>
      <div className="pt">
        {/* Image */}
        <div className="productImg">
          <img src={item.productImage} alt={item.productName} />
        </div>

        {/* Details */}
        <div className="pt2">
          <div className="desc">{item.productName}</div>
          <div className="rating">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={starIcon} alt="star" />
            ))}
            <span>4.0</span>
          </div>
          <div className="price">
            <div className="oldPrice">${item.productOldPrice}</div>
            <div className="newPrice">${item.productNewPrice}</div>
          </div>
          <div className="policy">
            <div className="replacement">
              <img src={replacement} alt="replacement" />
              <span>7 days replacement policy</span>
            </div>
            <div className="delivery">
              <img src={freedlvry} alt="free delivery" />
              <span>Free delivery</span>
            </div>
            <div className="securedTransitions">
              <img src={cashOndly} alt="secured" />
              <span>Secured Transactions</span>
            </div>
          </div>
          <div className="size">
            <label htmlFor="sizeSelector" className="size-label">Size :</label>
            <select id="sizeSelector">
              {['S','M','L','XL'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity & Actions */}
        <div className="pt3">
          <div className="cal">
            <div className="quantity-label">Quantity :</div>
            <div className="quantity">
              <img src={plus} alt="+" onClick={() => handleQuantityChange('increment')} />
              <span>{quantity}</span>
              <img src={minus} alt="-" onClick={() => handleQuantityChange('decrement')} />
            </div>
            <div className="tprice">
              <div className="tprice-label">Total Price :</div>
              <div className="tprice-amt">${totalPrice}</div>
            </div>
          </div>

          <div className="btns">
            <button
              className="buybtn"
              onClick={() => navigate('/payment', { state: { totalPrice } })}
            >
              BUY
            </button>

            <button
              className="cartbtn"
              disabled={loading}
              onClick={isCartPresent ? handleRemoveFromCart : handleAddToCart}
            >
              {isCartPresent ? 'REMOVE CART' : 'ADD TO CART'}
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
