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
    DropdownItem,Container,Form,Button,Input} from 'reactstrap';
  import SecureLS from 'secure-ls';
import logo from '../assets/logo.png';
import search from '../assets/search.png';
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
      <Container className="themed-container" fluid="lg" > 
       <Navbar  style={{color:"#FFFFFF"}} light expand="md">
         <NavbarBrand  style={{}} to="/">
        <img src={logo} alt="Logo" style={{width:50,fontFamily:"sans-serif"}} />
         &nbsp;Weekly Fish Club
          </NavbarBrand>
          <Form inline>
      <Input type="text" placeholder="Search Fishes " className="mr-md-6"  />
      <Button variant="outline-success"><img src={search} alt="Logo" style={{width:20,fontFamily:"sans-serif"}} /></Button>
    </Form>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          
        {<Nav className="mr-auto" navbar>
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
              <Link style={{color:"#000",marginLeft:10,fontFamily:"sans-serif"}}  to="/">Store</Link>
            </NavItem>
           
            <NavItem>
              <Link style={{color:"#000",marginLeft:10,fontFamily:"sans-serif"}} to="/category">Ocean</Link>
            </NavItem>
            <NavItem>
              <Link style={{color:"#000",marginLeft:10,fontFamily:"sans-serif"}} to="/price-list">Price List</Link>
            </NavItem>
            
            <NavItem>
              <Link style={{color:"#000",marginLeft:10,fontFamily:"sans-serif"}} to="/cart">Cart</Link>
            </NavItem>
            
            {console.log(loginDetail.role)}
            

          </Nav>}
        </Collapse>
      </Navbar>
      </Container> 
    );
};

export default AppHeader;
