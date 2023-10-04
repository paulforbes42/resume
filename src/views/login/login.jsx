import React, { useState, useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submitHandler = useCallback(async (e) => {
    e.preventDefault();

    if (!email || !pass) { return; }

    setErr(null);

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
    }
  }, [email, pass, setErr]);

  return (
    <Container>
      <Row>
        <Col md={{ offset: 4, span: 4 }} className="mt-4">
          <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              {err && (
                <Alert variant="danger">Invalid Login Information.</Alert>
              )}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Password"
                  />
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
