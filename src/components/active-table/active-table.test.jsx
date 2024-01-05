import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import ActiveTable from './active-table';

describe('Active Table', () => {
  const mockHeaders = [
    {
      key: 'id',
      title: 'ID',
    },
    {
      key: 'name',
      title: 'Name',
    },
  ];

  const mockRows = [
    { id: '1', name: 'Test Row 1' },
    { id: '2', name: 'Test Row 2' },
  ];

  it('should render', () => {
    const { getByText } = render(
      <ActiveTable
        title="Test Table"
        headers={mockHeaders}
        rows={mockRows}
        page={0}
        limit={10}
      />,
    );

    expect(getByText('Test Table')).toBeInTheDocument();
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Test Row 1')).toBeInTheDocument();
    expect(getByText('Test Row 2')).toBeInTheDocument();
  });

  it('should render a message when no results are available', () => {
    const { getByText } = render(
      <ActiveTable
        title="Test Table"
        headers={mockHeaders}
        rows={[]}
        page={0}
        limit={10}
      />,
    );

    expect(getByText('Test Table')).toBeInTheDocument();
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('No records found.')).toBeInTheDocument();
  });

  it('should render with pagination', () => {
    const refresh = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <ActiveTable
        title="Test Table"
        headers={mockHeaders}
        rows={mockRows}
        page={0}
        limit={10}
        totalRows={89}
        refresh={refresh}
      />,
    );

    expect(getByTestId('pagination-0')).toBeInTheDocument();
    expect(getByTestId('pagination-1')).toBeInTheDocument();
    expect(getByTestId('pagination-2')).toBeInTheDocument();
    expect(getByTestId('pagination-3')).toBeInTheDocument();
    expect(getByTestId('pagination-4')).toBeInTheDocument();
    expect(getByTestId('pagination-5')).toBeInTheDocument();
    expect(getByTestId('pagination-6')).toBeInTheDocument();
    expect(getByTestId('pagination-7')).toBeInTheDocument();
    expect(getByTestId('pagination-8')).toBeInTheDocument();
    expect(queryByTestId('pagination-9')).not.toBeInTheDocument();

    fireEvent.click(getByTestId('pagination-1'));
    expect(refresh).toHaveBeenCalledWith(1, 10);

    fireEvent.click(getByTestId('pagination-8'));
    expect(refresh).toHaveBeenCalledWith(8, 10);
  });

  it('should render with actions', () => {
    const actions = [
      {
        key: 'test-1',
        icon: <span>Test Icon</span>,
        tooltip: 'Test Action Tooltip',
        onClick: jest.fn(),
      },
      {
        key: 'test-2',
        icon: <span>Test Icon 2</span>,
        tooltip: 'Test Action Tooltip 2',
        onClick: jest.fn(),
        variant: 'secondary',
      },
    ];
    const { getByText } = render(
      <ActiveTable
        actions={actions}
        title="Test Table"
        headers={mockHeaders}
        rows={mockRows}
        page={0}
        limit={10}
      />,
    );

    expect(getByText('Test Icon')).toBeInTheDocument();
    expect(getByText('Test Icon 2')).toBeInTheDocument();

    fireEvent.click(getByText('Test Icon'));
    expect(actions[0].onClick).toHaveBeenCalled();
    expect(actions[1].onClick).not.toHaveBeenCalled();

    fireEvent.click(getByText('Test Icon 2'));
    expect(actions[1].onClick).toHaveBeenCalled();
  });
});
