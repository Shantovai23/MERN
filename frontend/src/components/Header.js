import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {Route} from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from './SearchBox'
import TopHeader from './TopHeader'


const Header = ({history}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  
  const dispatch=useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  };
  
  return (
    <header>
    <TopHeader/>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect id='bg' >
        <Container fluid >
          <LinkContainer to="/">
            <Navbar.Brand> <i class="fab fa-pagelines" style={{fontSize:'35px',color:'#3CA861 '}}></i><span className='logoName'>KrishiVai.bd</span> </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/> 
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Route render={({history})=> <SearchBox history={history} />} />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart 
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>
                <i class="fas fa-address-card"></i>About
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={ userInfo.name } id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                 
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
