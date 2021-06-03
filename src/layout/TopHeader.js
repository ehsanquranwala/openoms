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
    DropdownItem,Container} from 'reactstrap';
  import SecureLS from 'secure-ls';
import logo from '../assets/logo.png';
import cart from '../assets/cart.png';
  import {
    Link
  } from "react-router-dom";
  import { useDispatch, useSelector } from 'react-redux';
  import { user, userdetail} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
  

const AppHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const login = useSelector(state => state.user);
    const loginDetail = useSelector(state => state.userdetail);
    const toggle = () => setIsOpen(!isOpen);
    return (
     <Navbar  style={{color:"#FFFFFF",backgroundColor:'#005EB8'}} light expand="md">
        
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          
        {<Nav className="mr-auto"
        
         navbar>
  {
            login.length===0?
            
              <NavItem >
                <Link   style={{color:"#000",marginLeft:10,fontFamily:"sans-serif"}} to="/login">Sign in</Link>
              </NavItem>
           
            :
          <UncontrolledDropdown nav inNavbar>
            <NavItem>
              <DropdownToggle nav caret>
              <Link style={{color:"#000",marginLeft:10,fontFamily:"sans-serif"}} >Profile</Link>
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
                <Link  onClick={()=>{dispatch(user([]),userdetail([])) }} to="/login">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
              
            </UncontrolledDropdown>
            }

           
            
            <NavItem>
              <Link style={{color:"#000",marginLeft:10,fontFamily:"sans-serif"}} to="/cart">
              <img src={cart} alt="Logo" style={{fontFamily:"sans-serif"}} />
              </Link>
            </NavItem>
            
            {console.log(loginDetail.role)}
          

          </Nav>}
        </Collapse>
      </Navbar>
     
    );
};

export default AppHeader;
