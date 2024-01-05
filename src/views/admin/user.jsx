import React, {
  useCallback,
  useContext,
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
  useParams,
} from 'react-router-dom';

import request from '../../utils/request';
import ToastContext from '../../context/toast';

import ActiveForm from '../../components/active-form/active-form';

const editUserFields = [
  {
    name: 'id',
    label: 'ID',
    type: 'text',
    readOnly: true,
    exclude: true,
    placeholder: 'ID',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
    required: true,
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'First Name',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Last Name',
    required: true,
  },
  {
    name: 'createdAt',
    label: 'Created',
    type: 'text',
    readOnly: true,
    exclude: true,
    placeholder: 'Created',
  },
];

export default function AdminUserView() {
  const userDetail = useLoaderData();
  const { userId } = useParams();
  const setToast = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useCallback((data) => {
    const fetchData = async () => {
      await request(`/api/admin/user/${userId}`, {
        method: 'PUT',
        body: data,
      });
      setIsLoading(false);
      setToast({
        header: 'Updated Success',
        body: 'The user has been updated.',
      });
    };

    setIsLoading(true);
    fetchData();
  }, [userId]);

  return (
    <Container>
      <h1 className="mb-4">Admin - User Detail</h1>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/admin' }}>Admin</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/admin/users' }}>Users</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/admin/user/${userId}` }} active>{userId}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <Card>
            <Card.Header>Edit User Information</Card.Header>
            <ActiveForm
              fields={editUserFields}
              data={userDetail}
              onSubmit={updateUser}
              isLoading={isLoading}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
