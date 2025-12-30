import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { sidebarUserMenuMock } from '../../model/data/sidebarMock';

import { SidebarMenuList } from './SidebarMenuList';

describe('SidebarMenuList', () => {
	test('render', () => {
		renderComponent(<SidebarMenuList menuItems={sidebarUserMenuMock} fullWidth={false} />);
		const menuList = screen.getByTestId('SidebarMenuList');

		expect(menuList).toBeInTheDocument();
		expect(menuList).toHaveClass('nav');
		expect(menuList.children).toHaveLength(sidebarUserMenuMock.length);
	});

	test('should render empty when no menu items provided', () => {
		renderComponent(<SidebarMenuList menuItems={[]} fullWidth={false} />);
		const menuList = screen.getByTestId('SidebarMenuList');
		expect(menuList).toBeEmptyDOMElement();
	});
});
