import { screen, fireEvent } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { tabsTestIds } from './constants';
import { Tabs, TabsProps } from './Tabs';
import styles from './Tabs.module.css';
import type { Tab } from './types';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

type TestTab = 'tab-1' | 'tab-2';

const mockTabs: Tab<TestTab>[] = [
	{ id: 'tab-1', label: 'Tab 1', count: 10, Component: () => <div>Tab 1 Content</div> },
	{ id: 'tab-2', label: 'Tab 2', count: 0, Component: () => <div>Tab 2 Content</div> },
];

const setActiveTab = jest.fn();

const defaultProps: TabsProps<TestTab> = {
	tabs: mockTabs,
	activeTab: mockTabs[0],
	setActiveTab: setActiveTab,
};

describe('Tabs Component', () => {
	test('calls setActiveTab with correct tab on click', () => {
		renderComponent(<Tabs {...defaultProps} />);

		const tab2 = screen.getByTestId(tabsTestIds.item('tab-2'));

		fireEvent.click(tab2);

		expect(setActiveTab).toHaveBeenCalledWith(mockTabs[1]);
	});

	test('navigates to correct tab when clicked', () => {
		renderComponent(<Tabs {...defaultProps} />);

		fireEvent.click(screen.getByTestId(tabsTestIds.item('tab-1')));

		expect(mockNavigate).toHaveBeenCalledWith('#tab-1', { replace: true });
	});

	test('handles empty tabs array gracefully', () => {
		renderComponent(<Tabs {...defaultProps} tabs={[]} />);

		expect(screen.queryByRole('tab')).toBeNull();
	});

	test('renders tabs with correct count', () => {
		renderComponent(<Tabs {...defaultProps} />);

		const tab1 = screen.getByTestId(tabsTestIds.item('tab-1'));
		const tab2 = screen.getByTestId(tabsTestIds.item('tab-2'));

		expect(tab1).toHaveTextContent('Tab 1 (10)');
		expect(tab2).toHaveTextContent('Tab 2');
	});

	test('applies gray color variant when specified', () => {
		renderComponent(<Tabs {...defaultProps} color="gray" />);

		const tabList = screen.getByRole('tablist');
		const tabItems = screen.getAllByRole('tab');

		expect(tabList).toHaveClass(styles.gray);

		tabItems.forEach((tabItem) => {
			expect(tabItem).toHaveClass(styles.gray);
		});
	});

	test('applies default color variant when not specified', () => {
		renderComponent(<Tabs {...defaultProps} />);

		const tabList = screen.getByRole('tablist');
		const tabItems = screen.getAllByRole('tab');

		expect(tabList).toHaveClass(styles.default);
		expect(tabList).not.toHaveClass(styles.gray);

		tabItems.forEach((tabItem) => {
			expect(tabItem).toHaveClass(styles.default);
			expect(tabItem).not.toHaveClass(styles.gray);
		});
	});

	test('highlights the active tab', () => {
		renderComponent(<Tabs {...defaultProps} activeTab={mockTabs[1]} />);

		const activeTab = screen.getByTestId(tabsTestIds.item('tab-2'));
		const inactiveTab = screen.getByTestId(tabsTestIds.item('tab-1'));

		expect(activeTab).toHaveClass(styles.active);
		expect(inactiveTab).not.toHaveClass(styles.active);
	});

	test('applies correct text color to active and inactive tabs', () => {
		renderComponent(<Tabs {...defaultProps} />);

		const tab1Text = screen.getByText('Tab 1 (10)');
		const tab2Text = screen.getByText('Tab 2');

		expect(tab1Text).toHaveClass('text-purple-700');
		expect(tab2Text).toHaveClass('text-black-500');
	});
});
