import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

function Navbar() {
  return (
    <ul className="navbar">
      <li>
        <Link className="navbar__link" to="/"> Tosin Faith</Link>
      </li>
    </ul>
  );
}

export default Navbar;
