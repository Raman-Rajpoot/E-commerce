import React from 'react'
import PopularWoman from "./popularWoman.jsx"
import PopularKids from "./popularInKids.jsx";
import New_collection from './New_collection.jsx';
import Shop from './Shop.jsx';
const Popular = () => {
  return (
    <div>
        <Shop />
         <PopularKids/> 
        <PopularWoman />
        <New_collection />
    </div>
  )
}

export default Popular;