import React, {
  useCallback,
  useState,
} from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {
  Link,
  useLoaderData,
} from 'react-router-dom';

import request from '../../utils/request';

import ActiveTable from '../../components/active-table/active-table';

const userTableHeaders = [
  {
    key: 'id',
    title: 'ID',
    type: 'link',
    href: (row) => `/admin/user/${row.id}`,
  },
  {
    key: 'firstName',
    title: 'First Name',
  },
  {
    key: 'lastName',
    title: 'Last Name',
  },
  {
    key: 'email',
    title: 'Email',
  },
  {
    key: 'createdAt',
    title: 'Created',
  },
];

export default function AdminUsersView() {
  const userData = useLoaderData();
  const [users, setUsers] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pageTo = useCallback((page, limit) => {
    const fetchData = async () => {
      const data = await request(`/api/admin/user?page=${page}&limit=${limit}`);

      setUsers(data);
      setLoading(false);
      setCurrentPage(page);
    };

    setLoading(true);
    fetchData();
  });

  return (
    <Container>
      <h1 className="mb-4">Admin - Manage Users</h1>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Admin</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/admin/users' }} active>Users</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <Card>
            <Card.Header>User List</Card.Header>
            <ActiveTable
              headers={userTableHeaders}
              rows={users.rows}
              totalRows={users.count}
              loading={loading}
              page={currentPage}
              limit={10}
              refresh={pageTo}
              preventDirtyNavigation
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
