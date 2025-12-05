import { cleanup, fireEvent, screen } from '@testing-library/react';

import { Translation, i18n } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import {
	sidebarAdminEditorMenuMock,
	sidebarAdminPlatformMenuMock,
	sidebarUserMenuMock,
} from '../../model/data/sidebarMock';

import { Sidebar } from './Sidebar';

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(() => ({
		isMobile: false,
		isTablet: false,
		isLaptop: false,
		isDesktop: false,
		isLargeScreen: false,
	})),
}));

const mockLogout = jest.fn();
const mockWindowOpen = jest.fn();

jest.mock('@/entities/auth/api/authApi', () => ({
	useLazyLogoutQuery: jest.fn(() => [mockLogout]),
}));

beforeAll(() => {
	window.open = mockWindowOpen;
});

describe('Sidebar', () => {
	const setIsOpenSidebarDrawer = jest.fn();
	const onOpenSidebarDrawer = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('render', () => {
		renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
		const sidebar = screen.getByTestId('Sidebar');

		expect(sidebar).toBeInTheDocument();
		expect(sidebar).toHaveClass('sidebar');
		expect(sidebar).toHaveClass('desktop-sidebar');
	});

	test('render AdminSidebar', () => {
		renderComponent(<Sidebar menuItems={sidebarAdminPlatformMenuMock} />);
		expect(screen.getByText(i18n.t(Translation.SIDEBAR_MENU_ADMIN))).toBeInTheDocument();
	});

	test('should switch to editor menu when admin item clicked', () => {
		renderComponent(<Sidebar menuItems={sidebarAdminPlatformMenuMock} />);
		const adminItems = screen.getAllByRole('link');
		fireEvent.click(adminItems[0]);

		cleanup();
		renderComponent(<Sidebar menuItems={sidebarAdminEditorMenuMock} />);
		expect(screen.getByText(i18n.t(Translation.SIDEBAR_MENU_PLATFORM))).toBeInTheDocument();
	});

	test('should render mobile sidebar when isMobileSidebar is true', () => {
		renderComponent(<Sidebar menuItems={sidebarUserMenuMock} isMobileSidebar />);
		const mobileSidebar = screen.getByTestId('Sidebar');
		expect(mobileSidebar).not.toHaveClass('desktop-sidebar');
	});

	test('should close sidebar drawer when on desktop', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isDesktop: true });
		renderComponent(
			<Sidebar
				menuItems={sidebarUserMenuMock}
				isOpenSidebarDrawer={true}
				setIsOpenSidebarDrawer={setIsOpenSidebarDrawer}
			/>,
		);
		expect(setIsOpenSidebarDrawer).toHaveBeenCalledWith(false);
	});

	test('should not close sidebar drawer when not on desktop', () => {
		(useScreenSize as jest.Mock).mockReturnValue({ isDesktop: false });
		renderComponent(
			<Sidebar
				menuItems={sidebarUserMenuMock}
				isOpenSidebarDrawer={true}
				setIsOpenSidebarDrawer={setIsOpenSidebarDrawer}
			/>,
		);
		expect(setIsOpenSidebarDrawer).not.toHaveBeenCalled();
	});

	describe('CloseButton', () => {
		test('should toggle sidebar state on click for desktop', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isDesktop: true });
			renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
			const sidebar = screen.getByTestId('Sidebar');
			const closeButton = screen.getByTestId('Sidebar_CloseButton');

			expect(sidebar).not.toHaveClass('closing');
			expect(closeButton).toHaveClass('close-icon');
			expect(closeButton).not.toHaveClass('left');
			expect(closeButton).toHaveAttribute('aria-label', i18n.t(Translation.SIDEBAR_CLOSE));

			fireEvent.click(closeButton);
			expect(sidebar).toHaveClass('closing');
			expect(closeButton).toHaveClass('left');
			expect(closeButton).toHaveAttribute('aria-label', i18n.t(Translation.SIDEBAR_OPEN));
		});

		test('should close sidebar drawer when isOpenSidebarDrawer is true on laptop', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isLaptop: true });
			renderComponent(
				<Sidebar
					menuItems={sidebarUserMenuMock}
					isOpenSidebarDrawer={true}
					setIsOpenSidebarDrawer={setIsOpenSidebarDrawer}
				/>,
			);

			fireEvent.click(screen.getByTestId('Sidebar_CloseButton'));
			expect(setIsOpenSidebarDrawer).toHaveBeenCalledWith(false);
			expect(onOpenSidebarDrawer).not.toHaveBeenCalled();
		});

		test('should open sidebar drawer when isOpenSidebarDrawer is false on laptop', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isLaptop: true });
			renderComponent(
				<Sidebar
					menuItems={sidebarUserMenuMock}
					isOpenSidebarDrawer={false}
					setIsOpenSidebarDrawer={setIsOpenSidebarDrawer}
					onOpenSidebarDrawer={onOpenSidebarDrawer}
				/>,
			);

			fireEvent.click(screen.getByTestId('Sidebar_CloseButton'));
			expect(setIsOpenSidebarDrawer).not.toHaveBeenCalled();
			expect(onOpenSidebarDrawer).toHaveBeenCalled();
		});
	});

	describe('BottomButtons', () => {
		test('render', () => {
			renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
			const bottomButtons = screen.getByTestId('Sidebar_BottomButtons');
			expect(bottomButtons).toBeInTheDocument();
			expect(bottomButtons).toHaveClass('bottom-actions');
		});

		test('render only FirstButton', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: false, isTablet: false });
			renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
			expect(screen.getByTestId('Sidebar_BottomFirstButton')).toBeInTheDocument();
			expect(screen.queryByTestId('Sidebar_BottomSecondButton')).not.toBeInTheDocument();
		});

		test('render FirstButton, SecondButton for mobile', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });
			renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
			expect(screen.getByTestId('Sidebar_BottomFirstButton')).toBeInTheDocument();
			expect(screen.getByTestId('Sidebar_BottomSecondButton')).toBeInTheDocument();
		});

		test('render FirstButton, SecondButton for tablet', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isTablet: true });
			renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
			expect(screen.getByTestId('Sidebar_BottomFirstButton')).toBeInTheDocument();
			expect(screen.queryByTestId('Sidebar_BottomSecondButton')).toBeInTheDocument();
		});

		test('should open support tab when support button is clicked', () => {
			renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
			fireEvent.click(screen.getByTestId('Sidebar_BottomFirstButton'));
			expect(mockWindowOpen).toHaveBeenCalledWith('https://t.me/yeahub_support', '_blank');
		});

		test('should call logout when logout button is clicked', () => {
			(useScreenSize as jest.Mock).mockReturnValue({ isMobile: true });
			renderComponent(<Sidebar menuItems={sidebarUserMenuMock} />);
			fireEvent.click(screen.getByTestId('Sidebar_BottomSecondButton'));
			expect(mockLogout).toHaveBeenCalled();
		});
	});
});
