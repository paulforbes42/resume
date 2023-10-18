import React from 'react';
import PropTypes from 'prop-types';

export default function Overlay({
  action,
  onClick,
  title,
  isOpen,
}) {
  if (!isOpen) return null;

  const content = (
    <div className="overlay-content text-center">
      <span>{action}</span>
      <span>
        {title && <h4>{title}</h4>}
      </span>
    </div>
  );

  if (!onClick) {
    return (
      <div className="overlay">{content}</div>
    );
  }

  return (
    <button type="button" className="overlay" onClick={onClick}>{content}</button>
  );
}

Overlay.propTypes = {
  onClick: PropTypes.func,
  action: PropTypes.node,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
};

Overlay.defaultProps = {
  onClick: null,
  action: null,
  title: '',
  isOpen: false,
};
