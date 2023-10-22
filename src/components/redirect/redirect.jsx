import {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import {
  useNavigate,
} from 'react-router-dom';

export default function Redirect({ to }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return null;
}

Redirect.propTypes = {
  to: PropTypes.string.isRequired,
};
