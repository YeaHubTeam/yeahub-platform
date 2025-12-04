import { screen } from '@testing-library/react';

import { i18n } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import { profileMenuItemMock, sidebarUserMenuMock } from '../../model/data/sidebarMock';

import SidebarSingleMenuItem from './SidebarSingleMenuItem';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(() => ({
		isMobile: false,
		isTablet: false,
		isLaptop: false,
		isDesktop: false,
		isLargeScreen: false,
	})),
}));

describe('SidebarSingleMenuItem', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('render', () => {
		const [menuItem] = sidebarUserMenuMock.filter((item) => item.type === 'single');
		renderComponent(<SidebarSingleMenuItem menuItem={menuItem} fullWidth={false} />);
		const singleItem = screen.getByTestId('SidebarSingleMenuItem');
		expect(singleItem).toBeInTheDocument();
		expect(singleItem).toHaveClass('container');
		expect(singleItem).toHaveTextContent(i18n.t(menuItem.title));
	});

	describe('profileInfo route', () => {
		const profileItem = profileMenuItemMock;

		test('does not render on desktop', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false, isTablet: false });
			renderComponent(<SidebarSingleMenuItem menuItem={profileItem} fullWidth={false} />);
			expect(screen.queryByTestId('SidebarSingleMenuItem')).not.toBeInTheDocument();
		});

		test('render on mobile', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true, isTablet: false });
			renderComponent(<SidebarSingleMenuItem menuItem={profileItem} fullWidth={false} />);
			expect(screen.getByTestId('SidebarSingleMenuItem')).toBeInTheDocument();
		});

		test('render on tablet', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false, isTablet: true });
			renderComponent(<SidebarSingleMenuItem menuItem={profileItem} fullWidth={false} />);
			expect(screen.getByTestId('SidebarSingleMenuItem')).toBeInTheDocument();
		});
	});
});
