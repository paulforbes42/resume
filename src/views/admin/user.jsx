import React, {
  useCallback,
  useState,
} from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {
  useLoaderData,
  useOutletContext,
  useParams,
} from 'react-router-dom';

import request from '../../utils/request';

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
  const params = useParams();
  const {
    setToast,
  } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useCallback((data) => {
    const fetchData = async () => {
      await request(`/api/admin/user/${params.userId}`, {
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
  }, [params]);

  return (
    <Container>
      <h1>Admin - User Detail</h1>
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
