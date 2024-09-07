import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { products } = location.state || [];

  return (
    <div>
      <h1>Search Results</h1>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: ${product.new_price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
