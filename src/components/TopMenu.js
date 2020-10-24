  
import React from "react";
import {Link } from "react-router-dom";


const TopMenu = () => {
  return (
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/play">Play</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/profile">Profile</Link></li>
      </ul>
  );
};
export default TopMenu;