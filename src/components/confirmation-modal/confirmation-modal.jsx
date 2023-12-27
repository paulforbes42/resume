import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationModal({
  show,
  onHide,
  onSubmit,
  title,
  body,
  buttonText,
  buttonVariant,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          data-testid="modal-submit"
          variant={buttonVariant}
          onClick={onSubmit}
        >
          <span>{buttonText}</span>
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  buttonText: PropTypes.string,
  buttonVariant: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  show: false,
  title: 'Confirm Action',
  body: 'Are you sure you want to proceed?',
  buttonText: 'Confirm',
  buttonVariant: 'primary',
};
