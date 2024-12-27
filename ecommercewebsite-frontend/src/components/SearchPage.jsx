import React, { useState } from 'react';
import './SearchPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(['example1', 'example2', 'example3']);
  const [suggestions, setSuggestions] = useState(['suggestion1', 'suggestion2', 'suggestion3']);

  // Handles input changes and dynamically updates suggestions
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Mock logic for generating suggestions
    if (query) {
      setSuggestions(
        [`${query} suggestion1`, `${query} suggestion2`, `${query} suggestion3`].slice(0, 5)
      );
    } else {
      setSuggestions(['suggestion1', 'suggestion2', 'suggestion3']); // Default suggestions
    }
  };

  // Handles form submission for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to history if it's not a duplicate
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory([searchQuery, ...searchHistory]);
      }
      setSearchQuery('');
    }
  };

  return (
    <div className="search-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo">MyLogo</div>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </header>

      {/* Suggestions Section */}
      <div className="suggestions">
        <h3>Suggestions</h3>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>

      {/* Search History Section */}
      <div className="search-history">
        <h3>Search History</h3>
        <ul>
          {searchHistory.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchPage;
