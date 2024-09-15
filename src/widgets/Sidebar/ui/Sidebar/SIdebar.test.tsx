import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { sidebarMenuListMock } from '../../model/data/sidebarTestData';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
	beforeEach(() => {
		renderComponent(<Sidebar menuItems={sidebarMenuListMock} />);
	});

	test('render', () => {
		expect(screen.getByTestId('Sidebar')).toBeInTheDocument();
	});

	test('thin sidebar', () => {
		const sidebar = screen.getByTestId('Sidebar');
		const button = screen.getByTestId('Sidebar_CloseButton');
		expect(sidebar).not.toHaveClass('closing');
		expect(button).not.toHaveClass('left');
		fireEvent.click(button);
		expect(sidebar).toHaveClass('closing');
		expect(button).toHaveClass('left');
		fireEvent.click(button);
		expect(sidebar).not.toHaveClass('closing');
		expect(button).not.toHaveClass('left');
	});
});
