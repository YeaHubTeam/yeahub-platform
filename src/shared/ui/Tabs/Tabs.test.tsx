import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Tab, Tabs, TabsProps } from './Tabs';
import styles from './Tabs.module.css';

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

type TabsWrapperProps = {
	tabs: Tab<TestTab>[];
	color?: 'default' | 'gray';
};

const TabsWrapper = ({ tabs, color = 'default' }: TabsWrapperProps) => {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	return <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} color={color} />;
};

const renderControlledComponent = () => {
	const defaultProps: TabsWrapperProps = {
		tabs: mockTabs,
		color: 'default',
	};

	return render(
		<MemoryRouter>
			<TabsWrapper {...defaultProps} />
		</MemoryRouter>,
	);
};

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
	test('calls setActiveTab with correct tab on click', () => {
		renderComponent();

		const tab2 = screen.getByTestId('Tabs_Item_tab-2');

		fireEvent.click(tab2);

		expect(setActiveTab).toHaveBeenCalledWith(mockTabs[1]);
	});

	test('applies active class to clicked tab and removes from others', () => {
		renderControlledComponent();
		const tab1 = screen.getByTestId('Tabs_Item_tab-1');
		const tab2 = screen.getByTestId('Tabs_Item_tab-2');

		expect(tab1).toHaveClass(styles.active);
		expect(tab2).not.toHaveClass(styles.active);

		fireEvent.click(tab2);

		expect(tab2).toHaveClass(styles.active);
		expect(tab1).not.toHaveClass(styles.active);
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

	test('renders tabs with correct count', () => {
		renderComponent();

		const tab1 = screen.getByTestId('Tabs_Item_tab-1');
		const tab2 = screen.getByTestId('Tabs_Item_tab-2');

		expect(tab1).toHaveTextContent('Tab 1 (10)');
		expect(tab2).toHaveTextContent('Tab 2');
	});

	test('applies gray color variant when specified', () => {
		renderComponent({ color: 'gray' });

		const tabList = screen.getByRole('tablist');
		const tabItems = screen.getAllByRole('tab');

		expect(tabList).toHaveClass(styles.gray);

		tabItems.forEach((tabItem) => {
			expect(tabItem).toHaveClass(styles.gray);
		});
	});

	test('applies default color variant when not specified', () => {
		renderComponent();

		const tabList = screen.getByRole('tablist');
		const tabItems = screen.getAllByRole('tab');

		expect(tabList).toHaveClass(styles.default);
		expect(tabList).not.toHaveClass(styles.gray);

		tabItems.forEach((tabItem) => {
			expect(tabItem).toHaveClass(styles.default);
			expect(tabItem).not.toHaveClass(styles.gray);
		});
	});

	test('applies correct text color to active and inactive tabs', () => {
		renderControlledComponent();

		const tab1Text = screen.getByText('Tab 1 (10)');
		const tab2Text = screen.getByText('Tab 2');

		expect(tab1Text).toHaveClass('text-purple-700');
		expect(tab2Text).toHaveClass('text-black-500');

		fireEvent.click(screen.getByTestId('Tabs_Item_tab-2'));

		expect(tab2Text).toHaveClass('text-purple-700');
		expect(tab1Text).toHaveClass('text-black-500');
	});
});
