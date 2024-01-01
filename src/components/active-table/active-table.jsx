import React, {
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../overlay/overlay';

import clamp from '../../utils/clamp';

export default function ActiveTable({
  headers, rows, totalRows, page, limit, refresh, loading,
}) {
  const pages = useMemo(() => Math.ceil(totalRows / limit), [limit, totalRows]);
  const startRecord = useMemo(() => (page * limit) + 1, [page, limit]);
  const endRecord = useMemo(
    () => clamp((page + 1) * limit, 0, totalRows),
    [page, limit, totalRows],
  );

  return (
    <div>
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
                <td key={`${header.key}-${row[headers[0].key]}`}>{row[header.key]}</td>
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
    </div>
  );
}

ActiveTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
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
};
