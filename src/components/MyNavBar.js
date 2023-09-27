import { Dropdown } from "bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
const MyNavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ReactDemo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink  className="nav-link"  to="/">Home</NavLink>
              <NavLink  className="nav-link" to="/allusers">All Users</NavLink>
              <NavLink  className="nav-link" to="/newuser"> New User</NavLink>
              <NavLink  className="nav-link" to="/newproduct"> New Product</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavBar;
