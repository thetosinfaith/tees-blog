import React from 'react';
import { Link } from 'react-router-dom';
import { TbUserHeart } from "react-icons/tb";
import MyLogo from '../../assets/MyLogo.png'


const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <Link to="/"><img src={MyLogo} alt="My Blog Logo" style={logoImageStyle} /></Link>
      </div>
      <div style={navLinksContainerStyle}>
        <div style={navLinksStyle}>
          <Link to="/about" style={navLinkStyle}><TbUserHeart /> </Link>
        </div>
      </div>
    </nav>
  );
};

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '2rem 2rem',
  backgroundColor: '#333',
  color: '#fff',
  flexWrap: 'wrap'
};

const logoStyle = {
  flex: '1',
};

const logoImageStyle = {
    height: '200px', 
    width: 'auto', 
  };
  

const navLinksContainerStyle = {
  flex: '2',
  display: 'flex',
  justifyContent: 'flex-end',
};

const navLinksStyle = {
  display: 'flex',
  gap: '1rem',
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  transition: 'background-color 0.3s',
};

export default Navbar;
