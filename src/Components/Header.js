import React from "react";
import logo from "../images/logo_ceramic-ok/logo_ceramc-ok.png";
import "./Header.css";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
      <NavBar />
    </header>
  );
}

export default Header;
