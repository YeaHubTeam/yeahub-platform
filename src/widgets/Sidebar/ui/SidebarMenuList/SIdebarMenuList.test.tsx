import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { sidebarMenuListMock } from '../../model/data/sidebarTestData';

import { SidebarMenuList } from './SidebarMenuList';

describe('SidebarMenuList', () => {
	test('render', () => {
		renderComponent(<SidebarMenuList menuItems={sidebarMenuListMock} fullWidth={false} />);
		const menuList = screen.getByTestId('SidebarMenuList');
		expect(menuList).toBeInTheDocument();
		expect(menuList.children).toHaveLength(sidebarMenuListMock.length);
	});
});
