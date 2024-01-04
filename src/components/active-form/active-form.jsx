import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {
  useBlocker,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import ConfirmationModal from '../confirmation-modal/confirmation-modal';
import Overlay from '../overlay/overlay';

export default function ActiveForm({
  title,
  fields,
  data,
  submitText,
  focus,
  floatingLabels,
  isLoading,
  formError,
  onSubmit,
  preventDirtyNavigation,
}) {
  const [formData, setFormData] = useState(() => fields.reduce((obj, item) => ({
    ...obj,
    [item.name]: data[item.name] || '',
  }), {}));

  const [isDirty, setIsDirty] = useState(false);
  const formRef = useRef(null);

  const blocker = useBlocker(() => preventDirtyNavigation && isDirty);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const output = {};

    Object.keys(formData).forEach((k) => {
      const field = fields.find((f) => f.name === k);

      if (!field.exclude) { output[k] = formData[k]; }
    });

    setIsDirty(false);
    onSubmit(output);
  }, [formData, onSubmit]);

  // Focus the first field in the form
  useEffect(() => {
    if (!focus) return;
    formRef.current.querySelector('input')?.focus();
  }, []);

  return (
    <>
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
        {title && <Card.Header>{title}</Card.Header>}
        <Card.Body>
          {formError && (
            <Alert variant="danger">{formError}</Alert>
          )}
          <Form
            data-testid="active-form"
            ref={formRef}
            onSubmit={onSubmit ? handleSubmit : null}
          >
            {fields.map((field) => (floatingLabels ? (
              <Form.Group className="mb-2" key={field.name}>
                <FloatingLabel
                  label={field.label}
                >
                  <Form.Control
                    value={formData[field.name]}
                    type={field.type || 'text'}
                    name={field.exclude ? '' : field.name}
                    required={field.required ? 'required' : ''}
                    readOnly={field.readOnly ? 'readonly' : ''}
                    disabled={field.readOnly ? 'disabled' : ''}
                    onChange={(e) => setFormData(() => {
                      setIsDirty(true);
                      return {
                        ...formData,
                        [field.name]: e.target.value,
                      };
                    })}
                    placeholder={field.placeholder}
                  />
                  {field.invalid && <Form.Control.Feedback type="invalid">{field.invalid}</Form.Control.Feedback>}
                </FloatingLabel>
              </Form.Group>
            ) : (
              <Row className="mb-3" key={`form-field-${field.name}`}>
                <Form.Label className="col-sm-2" column="sm">{field.label}</Form.Label>
                <Col sm={10}>
                  <Form.Group>
                    <Form.Control
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      name={field.exclude ? '' : field.name}
                      type={field.type || 'text'}
                      required={field.required ? 'required' : ''}
                      readOnly={field.readOnly ? 'readonly' : ''}
                      disabled={field.readOnly ? 'disabled' : ''}
                      onChange={(e) => setFormData(() => {
                        setIsDirty(true);
                        return {
                          ...formData,
                          [field.name]: e.target.value,
                        };
                      })}
                    />
                    {field.invalid && <Form.Control.Feedback type="invalid">{field.invalid}</Form.Control.Feedback>}
                  </Form.Group>
                </Col>
              </Row>
            )))}
            <Button type="submit">{submitText}</Button>
          </Form>
        </Card.Body>
      </Card>

      <ConfirmationModal
        show={blocker.state === 'blocked'}
        onHide={() => blocker.reset()}
        title="Unsaved Form"
        body="You have unsaved changes. Are you sure you want to leave this page?"
        buttonText="Continue"
        buttonVariant="danger"
        onSubmit={() => blocker.proceed()}
      />
    </>
  );
}

ActiveForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      exclude: PropTypes.bool,
      invalid: PropTypes.string,
      readOnly: PropTypes.bool,
    }),
  ).isRequired,
  data: PropTypes.shape({}),
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitText: PropTypes.string,
  focus: PropTypes.bool,
  floatingLabels: PropTypes.bool,
  isLoading: PropTypes.bool,
  formError: PropTypes.string,
  preventDirtyNavigation: PropTypes.bool,
};

ActiveForm.defaultProps = {
  title: '',
  data: {},
  submitText: 'Submit',
  focus: false,
  floatingLabels: false,
  isLoading: false,
  formError: '',
  preventDirtyNavigation: false,
  onSubmit: null,
};
