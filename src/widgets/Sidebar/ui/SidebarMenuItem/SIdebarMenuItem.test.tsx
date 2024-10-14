import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { sidebarMenuListMock } from '../../model/data/sidebarTestData';

import { SidebarMenuItem } from './SidebarMenuItem';

describe('SidebarMenuItem', () => {
	test('render', () => {
		renderComponent(<SidebarMenuItem menuItem={sidebarMenuListMock[1]} fullWidth={false} />);
		const link = screen.getByTestId('SidebarMenuItem_Link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveTextContent(sidebarMenuListMock[1].title);
		// expect(link).toHaveAttribute('href', `/${sidebarMenuListMock[1].route}`);
	});

	test('active link', () => {
		renderComponent(<SidebarMenuItem menuItem={sidebarMenuListMock[0]} fullWidth={false} />);
		const link = screen.getByTestId('SidebarMenuItem_Link');
		expect(link).toHaveClass('active');
	});

	test('not active link', () => {
		renderComponent(<SidebarMenuItem menuItem={sidebarMenuListMock[1]} fullWidth={false} />);
		const link = screen.getByTestId('SidebarMenuItem_Link');
		expect(link).not.toHaveClass('active');
	});

	test('full size', () => {
		renderComponent(<SidebarMenuItem menuItem={sidebarMenuListMock[0]} fullWidth={false} />);
		const linkText = screen.getByTestId('SidebarMenuItem_Link_Text');
		expect(linkText).toHaveClass('link-title');
		expect(linkText).not.toHaveClass('closing');
	});

	test('small size', () => {
		renderComponent(<SidebarMenuItem menuItem={sidebarMenuListMock[0]} fullWidth={true} />);
		const linkText = screen.getByTestId('SidebarMenuItem_Link_Text');
		expect(linkText).toHaveClass('link-title');
		expect(linkText).toHaveClass('closing');
	});
});
