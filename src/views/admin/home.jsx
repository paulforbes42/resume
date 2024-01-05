import React from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {
  Link,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminHomeView() {
  return (
    <Container>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/admin' }} active>Admin</Breadcrumb.Item>
      </Breadcrumb>
      <Row xs={1} md={3}>
        <Col>
          <Card>
            <Card.Header>
              <FontAwesomeIcon icon={faUser} />
              &nbsp;
              <span>User Management</span>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Search, assign roles and generally manage user accounts.
              </Card.Text>
              <Card.Link as={Link} to="/admin/users">Manage Users</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
