import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_ceramic-ok/logo_vok_ceramic_white_gold.png";
import "./Header.css";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="logo" />
      </Link>
      <NavBar />
    </header>
  );
}

export default Header;
