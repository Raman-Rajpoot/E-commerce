// import React, { useState } from 'react';
// import './SearchPage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// function SearchPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchHistory, setSearchHistory] = useState(['example1', 'example2', 'example3']);
//   const [suggestions, setSuggestions] = useState(['suggestion1', 'suggestion2', 'suggestion3']);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     // Optionally update suggestions here based on the searchQuery
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery) {
//       setSearchHistory([searchQuery, ...searchHistory]);
//     }
//     setSearchQuery('');
//   };

//   return (
//     <div className="search-page">
//       <header className="header">
//         <div className="logo">MyLogo</div>
//         <div className="search-icon-container">
//           <input
//             type="text"
//             className="search-input"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder="Search..."
//           />
//           <button className="search-button" onClick={handleSearchSubmit}>
//           <FontAwesomeIcon icon={faSearch} />
//           </button>
//         </div>
//       </header>
//       <div className="suggestions">
//         <h3>Suggestions</h3>
//         <ul>
//           {suggestions.map((suggestion, index) => (
//             <li key={index}>{suggestion}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="search-history">
        
//         <ul>
//           {searchHistory.map((historyItem, index) => (
//             <li key={index}>{historyItem}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default SearchPage;
