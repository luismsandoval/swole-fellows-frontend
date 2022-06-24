import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './AuthButtons';
// import LoginButton from './login';
// import LogoutButton from './logout';
import Image from 'react-bootstrap/Image'

class Header extends React.Component {
  render() {
    return (
      <Navbar id='navBar' >
        <Image src='SwoleFellowsIcon.png' id='logo'/>
        <Navbar.Brand id="appName">Swole Fellows</Navbar.Brand>
        <NavItem><Link to="/" style={{ color: '#000000'}} 
        className="nav-link" >Profile</Link></NavItem>
        <NavItem><Link to="/dashboard" style={{ color: '#000000' }} className="nav-link" >Dashboard </Link></NavItem>
        <NavItem><Link to="/about" style={{ color: '#000000' }} className="nav-link">About</Link></NavItem>
        <AuthButtons />
      </Navbar>
    )
  }
}

export default Header;
