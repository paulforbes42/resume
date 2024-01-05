import React, {
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  NavLink,
  Link,
  useNavigate,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import PermissionContext from '../../context/permission';

export default function PageHeader({ user }) {
  const navigate = useNavigate();
  const userPermissions = useContext(PermissionContext);

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
            {!!userPermissions && !!userPermissions.length && (
            <Nav.Item>
              <NavLink to="/admin" className="nav-link">Admin</NavLink>
            </Nav.Item>
            )}
          </Nav>
          <Nav>
            {user && (
            <div className="nav-link d-flex gap-1 text-light">
              <span>
                <FontAwesomeIcon
                  icon={faUser}
                />
              </span>
              <span>{user.firstName}</span>
            </div>
            )}
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

PageHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
  }),
};

PageHeader.defaultProps = {
  user: null,
};
