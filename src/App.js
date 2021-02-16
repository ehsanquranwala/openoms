import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import SecureLS from 'secure-ls';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/Category';
import Gallery from './components/Gallery';
import Product from './components/Product';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Profile from './components/Profile';

import {   Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText } from 'reactstrap';
var ls = new SecureLS({encodingType: 'aes'});
export default function App() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    
    <Router>
      <div>
      <Navbar  style={{backgroundColor:"#006994",color:"#FFFFFF"}} light expand="md">
        <NavbarBrand style={{color:"#FFFFFF"}} href="/">
        <img src={require('./Image/logo.png')} style={{width:70, marginTop: -7}} />
          Weekly Fish Club</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav  className="mr-auto" navbar>
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}}  href="/">Shop</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}} href="/category">Category</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}} href="/gallery">Gallery</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}} href="/cart">Cart</NavLink>
            </NavItem>
            
            {ls.get("user")==''?
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}} href="/login">Login</NavLink>
            </NavItem>
            :
            
          <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <NavLink style={{color:"#FFFFFF"}} >Profile</NavLink>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavLink  href="/Orders">My Orders</NavLink>
                </DropdownItem>
                <DropdownItem>
                <NavLink  href="/Profile">Profile</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <NavLink  onClick={()=>{ls.set('user', '')}} href="/login">Logout</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Navbar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          
         <Route path="/register">
            <Register />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

