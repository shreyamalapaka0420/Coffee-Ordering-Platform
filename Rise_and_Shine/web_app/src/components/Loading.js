import React from "react";

import './loader.scss'


//loader component to call the loader on page load
const Header = () => {
  return (
    <div className="loader-container"> 
        <img alt="loader" src={"https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"} />
    </div> 
  )
  
}
export default Header;
