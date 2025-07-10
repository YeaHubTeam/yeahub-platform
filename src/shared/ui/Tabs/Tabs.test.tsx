import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Tab, Tabs, TabsProps } from './Tabs';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

type TestTab = 'tab-1' | 'tab-2';

const mockTabs: Tab<TestTab>[] = [
	{ id: 'tab-1', label: 'Tab 1', Component: () => <div>Tab 1 Content</div> },
	{ id: 'tab-2', label: 'Tab 2', Component: () => <div>Tab 2 Content</div> },
];

const setActiveTab = jest.fn();

const renderComponent = (props = {}) => {
	const defaultProps: TabsProps<TestTab> = {
		tabs: mockTabs,
		activeTab: mockTabs[0],
		setActiveTab: setActiveTab,
	};

	return render(
		<MemoryRouter>
			<Tabs {...defaultProps} {...props} />
		</MemoryRouter>,
	);
};

describe('Tabs Component', () => {
	test('sets the active tab and line position correctly on initial render', () => {
		renderComponent();

		const tab1 = screen.getByTestId('Tabs_Item_tab-1');
		const lineRef = screen.getByTestId('Tabs_Line');

		expect(lineRef).toHaveStyle(`left: ${tab1.offsetLeft}px`);
		expect(lineRef).toHaveStyle(`width: ${tab1.offsetWidth}px`);
	});

	test('updates line position and active tab on tab click', async () => {
		renderComponent();

		const tab2 = screen.getByTestId('Tabs_Item_tab-2');
		const lineRef = screen.getByTestId('Tabs_Line');

		fireEvent.click(tab2);

		await waitFor(() => {
			expect(lineRef).toHaveStyle(`left: ${tab2.offsetLeft}px`);
			expect(lineRef).toHaveStyle(`width: ${tab2.offsetWidth}px`);
		});

		expect(setActiveTab).toHaveBeenCalledWith(mockTabs[1]);
	});

	test('navigates to correct tab when clicked', () => {
		renderComponent();

		fireEvent.click(screen.getByTestId('Tabs_Item_tab-1'));

		expect(mockNavigate).toHaveBeenCalledWith('#tab-1', { replace: true });
	});

	test('handles empty tabs array gracefully', () => {
		renderComponent({ tabs: [] });

		expect(screen.queryByRole('tab')).toBeNull();
	});
});
