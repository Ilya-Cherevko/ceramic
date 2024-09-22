import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar () {
  return (
    <nav className="menu">
      <NavLink to="/" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Домой</NavLink>
      <NavLink to="/plitka" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Керамическая плитка</NavLink>
      <NavLink to="/keramogranit" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Керамогранит</NavLink>
      <NavLink to="/AboutUs" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Как нас найти</NavLink>
    </nav>
  )
}

export default NavBar;