import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMobile,
  faLocationDot,
  faMagnifyingGlass,

  faPeopleGroup,
  faServer,
  faMagnifyingGlassChart,
  faBuildingColumns,
  faFutbol,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';

import {
  faGithub,
  fab,
} from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

import resume from '../../resume-leadership.json';
// import resume from '../../resume-developer.json';

library.add(
  fab,
  faServer,
  faPeopleGroup,
  faMagnifyingGlassChart,
  faBuildingColumns,
  faFutbol,
  faToolbox,
);

export default function HomeView() {
  return (
    <Container fluid className="home">
      <Row>
        <Col md={2} className="bg-light pt-4 pb-4 text-center">
          <Image
            src={resume.image}
            roundedCircle
            height="250"
            className="border border-warning border-5"
          />
        </Col>
        <Col md={7} className="bg-light pt-4 pb-4 pe-5">
          <h1>{resume.name}</h1>
          <h3 className="text-warning">{resume.role}</h3>
          <p>{resume.description}</p>
        </Col>
        <Col md={3} className="bg-primary pt-4">
          <ListGroup>
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-warning border border-warning rounded-circle p-2"
                width="18"
              />
              <span className="text-light">{resume.contact.email}</span>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center gap-2">
              <FontAwesomeIcon
                icon={faMobile}
                className="text-warning border border-warning rounded-circle p-2"
                width="18"
              />
              <span className="text-light">{resume.contact.phone}</span>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-warning border border-warning rounded-circle p-2"
                width="18"
              />
              <span className="text-light">{resume.contact.location}</span>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center gap-2">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-warning border border-warning rounded-circle p-2"
                width="18"
              />
              <span className="text-light">{resume.contact.website}</span>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent border-0 d-flex align-items-center gap-2">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-warning border border-warning rounded-circle p-2"
                width="18"
              />
              <span className="text-light">github.com/paulforbes42</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col md={9} className="p-5">
          <h2 className="d-flex gap-4 align-items-center mb-2 pb-3 text-primary">
            <FontAwesomeIcon icon={faToolbox} className="border border-2 border-primary rounded-circle p-3" />
            <span>Work Experience</span>
          </h2>
          {resume.experience.map((exp) => (
            <Card key={`experience-card-${exp.company}`} className="border-0 mb-4">
              <Card.Body className="pb-0">
                <Card.Title className="fw-bold text-primary">{exp.company}</Card.Title>
                <Card.Title className="fw-normal text-primary">{exp.role}</Card.Title>
                <Card.Text className="fst-italic text-warning">{exp.duration}</Card.Text>
              </Card.Body>
              <ListGroup variant="flush" className="styled-list">
                {exp.items.map((item) => (
                  <ListGroup.Item key={`experience-item-${item}`} className="border-0 text-primary pt-0 pb-0">{item}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ))}
        </Col>
        <Col md={3} className="bg-light pt-4">
          <Container className="pb-4">
            {resume.skills.map((skillset) => (
              <Row key={`skillset-${skillset.title}`} className="mb-2 pt-4">
                <Col>
                  <h2 className="d-flex gap-2 align-items-center mb-2 pb-3 border-bottom border-2 text-primary">
                    <FontAwesomeIcon icon={skillset.icon} className="border border-2 border-primary rounded-circle p-3" />
                    <span>{skillset.title}</span>
                  </h2>
                  <ListGroup className="styled-list styled-list-primary">
                    {skillset.items.map((item) => (
                      <ListGroup.Item key={`skillset-item-${item}`} className="bg-transparent border-0 text-primary pb-0">{item}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
