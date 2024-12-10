import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Tabs } from './Tabs';

const mockTabs = [
	{ id: 1, title: 'Tab 1', label: 'Tab 1', Component: () => <div>Tab 1 Content</div> },
	{ id: 2, title: 'Tab 2', label: 'Tab 2', Component: () => <div>Tab 2 Content</div> },
];

const setTabToggle = jest.fn();

describe('Tabs Component', () => {
	test('sets the active tab and line position correctly on initial render', () => {
		render(
			<MemoryRouter>
				<Tabs tabs={mockTabs} title="Test Tabs" tabToggle={0} setTabToggle={setTabToggle} />
			</MemoryRouter>,
		);

		const tab1 = screen.getByTestId('tab-item-0');
		const lineRef = screen.getByTestId('line-indicator');

		expect(lineRef).toHaveStyle(`left: ${tab1.offsetLeft}px`);
		expect(lineRef).toHaveStyle(`width: ${tab1.offsetWidth}px`);
	});

	test('updates line position and active tab on tab click', async () => {
		render(
			<MemoryRouter>
				<Tabs tabs={mockTabs} title="Test Tabs" tabToggle={0} setTabToggle={setTabToggle} />
			</MemoryRouter>,
		);

		const tab2 = screen.getByTestId('tab-item-1');
		const lineRef = screen.getByTestId('line-indicator');

		fireEvent.click(tab2);

		await waitFor(() => {
			expect(lineRef).toHaveStyle(`left: ${tab2.offsetLeft}px`);
			expect(lineRef).toHaveStyle(`width: ${tab2.offsetWidth}px`);
		});

		expect(setTabToggle).toHaveBeenCalledWith(1);
	});

	test('navigates to correct tab when clicked', () => {
		const mockNavigate = jest.fn();
		render(
			<MemoryRouter>
				<Tabs tabs={mockTabs} title="Test Tabs" tabToggle={0} setTabToggle={setTabToggle} />
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByTestId('tab-item-1'));

		expect(mockNavigate).toHaveBeenCalledWith('#Tab 2', { replace: true });
	});

	test('renders title if provided', () => {
		render(
			<MemoryRouter>
				<Tabs tabs={mockTabs} title="Test Tabs" tabToggle={0} setTabToggle={setTabToggle} />
			</MemoryRouter>,
		);

		expect(screen.getByTestId('tabs-title')).toHaveTextContent('Test Tabs');
	});

	test('handles empty tabs array gracefully', () => {
		render(
			<MemoryRouter>
				<Tabs tabs={[]} title="Test Tabs" tabToggle={0} setTabToggle={setTabToggle} />
			</MemoryRouter>,
		);

		expect(screen.queryByRole('tab')).toBeNull();
	});
});
