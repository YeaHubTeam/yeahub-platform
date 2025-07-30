import { fireEvent, screen } from '@testing-library/react';

import i18n from '@/shared/config/i18n/i18n';
import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { sidebarUserMenuMock } from '@/widgets/Sidebar/model/data/sidebarMock';

import SidebarCategoryMenuItem from './SidebarCategoryMenuItem';

describe('SidebarCategoryMenuItem', () => {
	const [menuItem] = sidebarUserMenuMock.filter((item) => item.type === 'category');

	test('render', () => {
		renderComponent(<SidebarCategoryMenuItem menuItem={menuItem} fullWidth={false} />);
		const categoryItem = screen.getByTestId('SidebarCategoryMenuItem');
		expect(categoryItem).toBeInTheDocument();
		expect(categoryItem).toHaveClass('category');
		expect(categoryItem).not.toHaveClass('fullWidth');
		expect(categoryItem).toHaveTextContent(i18n.t(menuItem.title));
	});

	test('applies fullwidth class', () => {
		renderComponent(<SidebarCategoryMenuItem menuItem={menuItem} fullWidth={true} />);
		const categoryItem = screen.getByTestId('SidebarCategoryMenuItem');
		expect(screen.queryByTestId('SidebarCategoryMenuItem_ArrowIcon')).not.toBeInTheDocument();
		expect(categoryItem).toHaveClass('fullwidth');
	});

	describe('ExpandedButton', () => {
		beforeEach(() => {
			renderComponent(<SidebarCategoryMenuItem menuItem={menuItem} fullWidth={false} />);
		});

		test('render', () => {
			const toggleBtn = screen.getByTestId('SidebarCategoryMenuItem_ExpandButton');
			expect(toggleBtn).toBeInTheDocument();
			expect(toggleBtn).toHaveClass('container');
		});

		test('should toggle expanded state on button click', () => {
			const categoryItem = screen.getByTestId('SidebarCategoryMenuItem');
			const toggleBtn = screen.getByTestId('SidebarCategoryMenuItem_ExpandButton');

			expect(categoryItem).not.toHaveClass('expanded');
			fireEvent.click(toggleBtn);
			expect(categoryItem).toHaveClass('expanded');
			fireEvent.click(toggleBtn);
			expect(categoryItem).not.toHaveClass('expanded');
		});
	});
});
