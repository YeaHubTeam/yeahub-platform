import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { sidebarUserMenuMock } from '../..//model/data/sidebarMock';
import { MenuItem } from '../../model/types/sidebar';

import { SidebarMenuItem } from './SidebarMenuItem';

describe('SidebarMenuItem', () => {
	test('render SidebarSingleMenuItem', () => {
		const [menuItem] = sidebarUserMenuMock.filter((item) => item.type === 'single');
		renderComponent(<SidebarMenuItem menuItem={menuItem} fullWidth={false} />);
		expect(screen.getByTestId('SidebarSingleMenuItem')).toBeInTheDocument();
		expect(screen.queryByTestId('SidebarCategoryMenuItem')).not.toBeInTheDocument();
	});

	test('render SidebarCategoryMenuItem', () => {
		const [menuItem] = sidebarUserMenuMock.filter((item) => item.type === 'category');
		renderComponent(<SidebarMenuItem menuItem={menuItem} fullWidth={false} />);
		expect(screen.getByTestId('SidebarCategoryMenuItem')).toBeInTheDocument();
		expect(screen.queryByTestId('SidebarSingleMenuItem')).not.toBeInTheDocument();
	});

	it.each([
		[
			'single',
			sidebarUserMenuMock.find((item) => item.type === 'single'),
			'SidebarSingleMenuItem_Notifications',
		],
		[
			'category',
			sidebarUserMenuMock.find((item) => item.type === 'category'),
			'SidebarCategoryMenuItem_Notifications',
		],
	])('shows notifications for %s menu item', (_, menuItem, testId) => {
		const testItem = { ...menuItem, notifications: 3 };

		renderComponent(<SidebarMenuItem menuItem={testItem as MenuItem} fullWidth={false} />);
		const notifications = screen.getByTestId(testId);

		expect(notifications).toBeInTheDocument();
		expect(notifications).toHaveClass('notifications');
		expect(notifications).toHaveTextContent('3');
	});
});
