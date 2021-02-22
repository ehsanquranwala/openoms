import React,{useState} from 'react';
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
    DropdownItem,} from 'reactstrap';
  import SecureLS from 'secure-ls';

  import {
    Link
  } from "react-router-dom";
  import { useDispatch, useSelector } from 'react-redux';
  import { user} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
  

const AppHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const login = useSelector(state => state.user);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar  style={{backgroundColor:"#006994",color:"#FFFFFF"}} light expand="md">
         <NavbarBrand style={{color:"#FFFFFF"}} to="/">
        <img src={'https://weeklyfishclub.com/wp-content/uploads/2021/02/tuna.jpg'} alt="Logo" style={{width:70, marginTop: -7}} />
          Weekly Fish Club</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav  className="mr-auto" navbar>
            <NavItem>
              <Link style={{color:"#FFFFFF"}}  to="/">Shop</Link>
            </NavItem>
            <NavItem>
              <Link style={{color:"#FFFFFF"}}  to="/Oms">OMS</Link>
            </NavItem>
            <NavItem>
              <Link style={{color:"#FFFFFF"}} to="/category">Category</Link>
            </NavItem>
            <NavItem>
              <Link style={{color:"#FFFFFF"}} to="/gallery">Gallery</Link>
            </NavItem>
            
            <NavItem>
              <Link style={{color:"#FFFFFF"}} to="/cart">Cart</Link>
            </NavItem>
            {console.log(login)}
            {
            login.length===0?
            <NavItem>
              <Link style={{color:"#FFFFFF"}} to="/login">Login</Link>
            </NavItem>
            :
          <UncontrolledDropdown nav inNavbar>
            <NavItem>
              <DropdownToggle nav caret>
              <Link style={{color:"#FFFFFF"}} >Profile</Link>
              </DropdownToggle>
              </NavItem>
              <DropdownMenu right>
                <DropdownItem>
                  <Link  to="/Orders">My Orders</Link>
                </DropdownItem>
                  <DropdownItem>
                <Link  to="/Profile">Profile</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <Link  onClick={()=>{dispatch(user([]))}} to="/login">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Navbar>
    );
};

export default AppHeader;
