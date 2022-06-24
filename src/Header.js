import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './AuthButtons';
// import LoginButton from './login';
// import LogoutButton from './logout';

class Header extends React.Component {
  render() {
    return (
      <Navbar className='navBar' >
        <Navbar.Brand>Swole Fellows</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link" >Home </Link></NavItem>
        
        <NavItem><Link to="/profile" className="nav-link" >Profile</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
        <AuthButtons />
        {/* <LoginButton/>
        <LogoutButton/> */}
      </Navbar>
    )
  }
}

export default Header;
