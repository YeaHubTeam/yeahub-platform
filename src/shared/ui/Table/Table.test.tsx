import { cleanup, fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { Table } from './Table';

type Person = {
	id: number;
	title: string;
	name: string;
	lastName: string;
};

const mockColumns = {
	title: 'Title',
	name: 'Name',
	lastName: 'LastName',
};

const expectedHeaders = ['Title', 'Name', 'LastName'];

const mockData: Person[] = [
	{ id: 0, title: 'Item 1', name: 'Ivan', lastName: 'Ivanov' },
	{ id: 1, title: 'Item 2', name: 'Vlad', lastName: 'Petrov' },
	{ id: 2, title: 'Item 3', name: 'Andrey', lastName: 'Sidorov' },
	{ id: 3, title: 'Item 4', name: 'Denis', lastName: 'Vasechkin' },
];

const renderTableHeader = () => {
	return Object.entries(mockColumns)?.map(([k, v]) => (
		<td data-testid="table-header-cell" key={k}>
			{v}
		</td>
	));
};

const renderTableBody = (person: Person) => {
	return Object.entries(person)?.map(([k, v]) => <td key={k}>{v}</td>);
};

const mockOnSelectItems = jest.fn();

const renderActions = jest.fn(() => <button>Action</button>);

const selectedItems = [
	{ id: mockData[0].id, title: mockData[0].title },
	{ id: mockData[1].id, title: mockData[1].title },
];

describe('Table', () => {
	beforeEach(() => {
		renderComponent(
			<Table
				items={mockData}
				renderTableHeader={renderTableHeader}
				renderTableBody={renderTableBody}
				onSelectItems={mockOnSelectItems}
				renderActions={renderActions}
				selectedItems={selectedItems}
			/>,
		);
	});

	test('should render Table', () => {
		const component = screen.getByTestId('table');
		expect(component).toBeInTheDocument();
	});

	test('should render correct number of rows', () => {
		const rows = screen.getAllByTestId('table-row');
		expect(rows).toHaveLength(mockData.length);
	});

	test('should render correct table headers', () => {
		const headers = screen.getAllByTestId('table-header-cell');

		headers.forEach((header, index) => {
			expect(header).toHaveTextContent(expectedHeaders[index]);
		});
	});

	test('should render correct data in table body', () => {
		mockData.forEach((person) => {
			expect(screen.getByText(person.title)).toBeInTheDocument();
			expect(screen.getByText(person.name)).toBeInTheDocument();
			expect(screen.getByText(person.lastName)).toBeInTheDocument();
		});
	});

	test('should select all items', () => {
		const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
		fireEvent.click(selectAllCheckbox);
		expect(mockOnSelectItems).toHaveBeenCalledWith(
			mockData.map((item) => ({ id: item.id, title: item.title })),
		);
	});

	test('should have correct checkbox state when some items are selected', () => {
		const checkboxes = screen.getAllByRole('checkbox');
		const itemCheckboxes = checkboxes.slice(1);

		expect(itemCheckboxes[0]).toBeChecked();
		expect(itemCheckboxes[1]).toBeChecked();
		expect(itemCheckboxes[2]).not.toBeChecked();
		expect(itemCheckboxes[3]).not.toBeChecked();

		fireEvent.click(itemCheckboxes[0]);

		expect(mockOnSelectItems).toHaveBeenCalledWith([
			{ id: mockData[1].id, title: mockData[1].title },
		]);
	});

	test('should render actions column when renderActions is provided', () => {
		const actionButtons = screen.getAllByRole('button', { name: 'Action' });
		expect(actionButtons).toHaveLength(mockData.length);
		expect(renderActions).toHaveBeenCalledTimes(mockData.length);
	});

	test('should render copy button when hasCopyButton prop is provided', () => {
		cleanup();
		renderComponent(
			<Table
				items={mockData}
				renderTableHeader={renderTableHeader}
				renderTableBody={renderTableBody}
				hasCopyButton
			/>,
		);

		const copyButtons = screen.getAllByTestId('Table_CopyButton');
		expect(copyButtons).toHaveLength(mockData.length);
	});

	test('should handle empty data array', () => {
		cleanup();
		renderComponent(
			<Table items={[]} renderTableHeader={renderTableHeader} renderTableBody={renderTableBody} />,
		);

		const rows = screen.queryAllByTestId('table-row');
		expect(rows).toHaveLength(0);
	});
});
