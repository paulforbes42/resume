import React, {
  useCallback,
} from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  NavLink,
  Link,
  useNavigate,
} from 'react-router-dom';

export default function PageHeader() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    window.sessionStorage.removeItem('a');
    navigate('/login');
  });

  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Welcome!</Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav-bar" />
        <Navbar.Collapse id="header-nav-bar">
          <Nav className="me-auto">
            <Nav.Item>
              <NavLink to="/" className="nav-link">Home</NavLink>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
