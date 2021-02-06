import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/Category';
import Product from './components/Product';
import Shop from './components/Shop';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, } from 'reactstrap';

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
              <NavLink style={{color:"#FFFFFF"}}  href="/shop">Shop</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}} href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}} href="/gallery">Gallery</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{color:"#FFFFFF"}} href="/login">Login</NavLink>
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/shop">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
         <Route path="/register">
            <Register />
          </Route>
          <Route path="/gallery">
            <Category />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

