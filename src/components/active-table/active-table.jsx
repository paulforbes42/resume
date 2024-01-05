import React, {
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import {
  Link,
} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../overlay/overlay';

import clamp from '../../utils/clamp';

export default function ActiveTable({
  title,
  actions,
  headers,
  rows,
  totalRows,
  page,
  limit,
  refresh,
  loading,
}) {
  const pages = useMemo(() => Math.ceil(totalRows / limit), [limit, totalRows]);
  const startRecord = useMemo(() => (page * limit) + 1, [page, limit]);
  const endRecord = useMemo(
    () => clamp((page + 1) * limit, 0, totalRows),
    [page, limit, totalRows],
  );

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <strong>{title}</strong>
        {!!actions && !!actions.length && (
          <div>
            <strong className="me-4">Actions:</strong>
            {actions.map((action) => (
              <OverlayTrigger
                key={action.key}
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="position-fixed">{action.tooltip}</Tooltip>}
              >
                <Button
                  size="sm"
                  variant={action.variant || 'primary'}
                  onClick={action.onClick}
                  data-testid={action.key}
                >
                  {action.icon}
                </Button>
              </OverlayTrigger>
            ))}
          </div>
        )}
      </Card.Header>
      <Overlay
        isOpen={loading}
        action={<FontAwesomeIcon icon={faSpinner} size="4x" className="text-light" spin />}
        title="Loading..."
      />
      <Table
        striped
        hover
        responsive
        variant="flush"
        className="mb-0"
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.title}>{header.title}</th>
            ))}
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan={headers.length}>
              <div className="w-100 d-flex gap-3 justify-content-between align-items-center pe-4">
                <span>
                  Displaying Rows
                  {' '}
                  <strong>
                    {startRecord}
                    {' '}
                    -
                    {' '}
                    {endRecord}
                  </strong>
                  {' '}
                  of
                  {' '}
                  <strong>{totalRows}</strong>
                </span>
                <span>
                  {refresh && totalRows > limit && (
                  <Pagination className="mb-0">
                    {[...Array(pages).keys()].map((i) => (
                      <Pagination.Item
                        key={i}
                        active={page === i}
                        onClick={() => refresh(i, limit)}
                        data-testid={`pagination-${i}`}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                  )}
                </span>
              </div>
            </td>
          </tr>
        </tfoot>
        <tbody>
          {!!rows.length && rows.map((row) => (
            <tr key={row[headers[0].key]}>
              {headers.map((header) => (
                <td key={`${header.key}-${row[headers[0].key]}`}>
                  {header.type === 'link' && (
                  <Link to={header.href(row)}>{row[header.key]}</Link>
                  )}
                  {(!header.type || header.type === 'text') && (
                  <span>{row[header.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          {!rows.length && (
          <tr>
            <td colSpan={headers.length} className="text-center">
              <i>No records found.</i>
            </td>
          </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
}

ActiveTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.string,
      href: PropTypes.func,
    }),
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      icon: PropTypes.node,
      tooltip: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  totalRows: PropTypes.number,
  page: PropTypes.number,
  limit: PropTypes.number,
  refresh: PropTypes.func,
  loading: PropTypes.bool,
};

ActiveTable.defaultProps = {
  rows: [],
  totalRows: 0,
  page: 0,
  limit: 0,
  refresh: null,
  loading: false,
  actions: null,
};
