import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function PageHeader() {
  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand href="/">Welcome!</Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav-bar" />
        <Navbar.Collapse id="header-nav-bar">
          <Nav className="me-auto">
            <Nav.Item>
              <NavLink to="/" className="nav-link">Home</NavLink>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
