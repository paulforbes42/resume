import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import ActiveForm from '../../components/active-form/active-form';

export default function LoginView() {
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginForm = useMemo(() => ([
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Email',
      required: true,
    },
    {
      label: 'Password',
      name: 'pass',
      type: 'password',
      placeholder: 'Password',
      required: true,
    },
  ]), []);

  const submitHandler = useCallback((formData) => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user/auth', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status > 299) {
          setFormError('Invalid Login Information.');
          return;
        }

        const data = await res.text();

        window.sessionStorage.setItem('a', data);
        navigate('/');
      } catch (error) {
        setFormError('Invalid Login Information.');
      } finally {
        setIsLoading(false);
      }
    };

    setFormError('');
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <Container className="login-view">
      <Row>
        <Col md={{ offset: 4, span: 4 }} className="p-0 position-relative">
          <ActiveForm
            focus
            floatingLabels
            isLoading={isLoading}
            onSubmit={submitHandler}
            title="Login"
            fields={loginForm}
            formError={formError}
          />
        </Col>
      </Row>
    </Container>
  );
}
