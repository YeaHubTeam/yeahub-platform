import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SelectedEntities } from '@/shared/libs';

import { Table } from './Table';

const meta: Meta<typeof Table> = {
	title: 'shared/Table',
	component: Table,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleItems = [
	{ id: 1, title: 'Item 1', description: 'Description 1' },
	{ id: 2, title: 'Item 2', description: 'Description 2' },
	{ id: 3, title: 'Item 3', description: 'Description 3' },
];

const renderTableHeader = () => (
	<>
		<th>Title</th>
		<th>Description</th>
	</>
);

const renderTableBody = (item: (typeof sampleItems)[number]) => (
	<>
		<td>{item.title}</td>
		<td>{item.description}</td>
	</>
);

export const Default: Story = {
	render: () => {
		const TableWithState = () => {
			const [selectedItems, setSelectedItems] = useState<SelectedEntities<string | number>>([]);
			return (
				<Table
					items={sampleItems}
					renderTableHeader={renderTableHeader}
					renderTableBody={renderTableBody}
					selectedItems={selectedItems}
					onSelectItems={setSelectedItems}
				/>
			);
		};
		return <TableWithState />;
	},
};

export const WithActions: Story = {
	render: () => (
		<Table
			items={sampleItems}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={(item) => (
				<button onClick={() => alert(`Action on ${item.title}`)}>Action</button>
			)}
		/>
	),
};

export const WithCopyButton: Story = {
	render: () => (
		<Table
			items={sampleItems}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			hasCopyButton
		/>
	),
};

export const EmptyState: Story = {
	render: () => (
		<Table items={[]} renderTableHeader={renderTableHeader} renderTableBody={() => <></>} />
	),
};
