import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Overlay from '../../components/overlay/overlay';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitHandler = useCallback((e) => {
    e.preventDefault();

    if (!email || !pass) { return; }

    const fetchData = async () => {
      try {
        const res = await fetch('/api/user/auth', {
          method: 'POST',
          body: JSON.stringify({ email, pass }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status > 299) {
          setErr(true);
          return;
        }

        const data = await res.text();

        window.sessionStorage.setItem('a', data);
        navigate('/dashboard');
      } catch (error) {
        setErr(true);
      } finally {
        setIsLoading(false);
      }
    };

    setErr(null);
    setIsLoading(true);
    fetchData();
  }, [email, pass, setErr]);

  return (
    <Container className="login-view">
      <Row>
        <Col md={{ offset: 4, span: 4 }} className="p-0 position-relative">
          <Overlay
            isOpen={isLoading}
            action={(
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-primary"
                size="4x"
              />
            )}
          />
          <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              {err && (
                <Alert variant="danger">Invalid Login Information.</Alert>
              )}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-2">
                  <FloatingLabel
                    label="Email"
                  >
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      ref={emailRef}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-2">
                  <FloatingLabel
                    label="Password"
                  >
                    <Form.Control
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Password"
                    />
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" className="mt-2">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
