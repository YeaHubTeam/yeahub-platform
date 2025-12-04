import { screen } from '@testing-library/react';
import { useLocation, useMatches } from 'react-router-dom';

import { useScreenSize } from '@/shared/libs';
import { renderComponent } from '@/shared/libs/jest';

import { Breadcrumbs } from './Breadcrumbs';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useMatches: jest.fn(),
	useLocation: jest.fn(),
}));

jest.mock('@/shared/libs', () => ({
	useScreenSize: jest.fn(),
}));

const mockUseMatches = useMatches as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;
const mockUseScreenSize = useScreenSize as jest.Mock;

describe('Breadcrumbs', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		mockUseLocation.mockReturnValue({ pathname: '/home' });
		mockUseScreenSize.mockReturnValue({ isMobile: false });
	});

	test('should not render when there are no matches with crumbs', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: null,
				pathname: '/',
			},
		]);

		const { container } = renderComponent(<Breadcrumbs />);

		expect(container.firstChild).toBeNull();
	});

	test('should not render when there is only one crumb', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: { crumb: 'Home' },
				pathname: '/home',
			},
		]);

		const { container } = renderComponent(<Breadcrumbs />);

		expect(container.firstChild).toBeNull();
	});

	test('should render breadcrumbs when there are multiple crumbs on desktop', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: null,
				pathname: '/',
			},
			{
				handle: { crumb: 'Home' },
				pathname: '/home',
			},
			{
				handle: { crumb: 'Profile' },
				pathname: '/home/profile',
			},
		]);

		mockUseLocation.mockReturnValue({ pathname: '/home/profile' });

		renderComponent(<Breadcrumbs />);

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Profile')).toBeInTheDocument();
	});

	test('should render separator icon between crumbs on desktop', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: null,
				pathname: '/',
			},
			{
				handle: { crumb: 'Home' },
				pathname: '/home',
			},
			{
				handle: { crumb: 'Settings' },
				pathname: '/home/settings',
			},
		]);

		mockUseLocation.mockReturnValue({ pathname: '/home/settings' });

		const { container } = renderComponent(<Breadcrumbs />);
		const icons = container.querySelectorAll('svg');

		expect(icons.length).toBe(1);
	});

	test('should render correct number of separators on mobile', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: null,
				pathname: '/',
			},
			{
				handle: { crumb: 'Home' },
				pathname: '/home',
			},
			{
				handle: { crumb: 'Settings' },
				pathname: '/home/settings',
			},
		]);

		mockUseLocation.mockReturnValue({ pathname: '/home/settings' });
		mockUseScreenSize.mockReturnValue({ isMobile: true });

		const { container } = renderComponent(<Breadcrumbs />);
		const icons = container.querySelectorAll('svg');

		expect(icons.length).toBe(2);
	});

	test('should render intermediate crumbs as links and last crumb as span', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: null,
				pathname: '/',
			},
			{
				handle: { crumb: 'Home' },
				pathname: '/home',
			},
			{
				handle: { crumb: 'Profile' },
				pathname: '/home/profile',
			},
			{
				handle: { crumb: 'Settings' },
				pathname: '/home/profile/settings',
			},
		]);

		mockUseLocation.mockReturnValue({ pathname: '/home/profile/settings' });

		renderComponent(<Breadcrumbs />);

		const homeCrumb = screen.getByText('Home');
		const profileCrumb = screen.getByText('Profile');
		const settingsCrumb = screen.getByText('Settings');

		expect(homeCrumb.tagName).toBe('A');
		expect(profileCrumb.tagName).toBe('A');
		expect(settingsCrumb.tagName).toBe('SPAN');
	});

	test('should filter out matches without handle', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: null,
				pathname: '/',
			},
			{
				handle: { crumb: 'Home' },
				pathname: '/home',
			},
			{
				handle: null,
				pathname: '/some-route',
			},
			{
				handle: { crumb: 'Profile' },
				pathname: '/home/profile',
			},
		]);

		mockUseLocation.mockReturnValue({ pathname: '/home/profile' });

		renderComponent(<Breadcrumbs />);

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Profile')).toBeInTheDocument();
		expect(screen.queryByText('some-route')).not.toBeInTheDocument();
	});

	test('should apply correct color to separator icon for last crumb', () => {
		mockUseMatches.mockReturnValue([
			{
				handle: null,
				pathname: '/',
			},
			{
				handle: { crumb: 'Home' },
				pathname: '/home',
			},
			{
				handle: { crumb: 'Profile' },
				pathname: '/home/profile',
			},
		]);

		mockUseLocation.mockReturnValue({ pathname: '/home/profile' });
		mockUseScreenSize.mockReturnValue({ isMobile: true });

		const { container } = renderComponent(<Breadcrumbs />);

		const icons = container.querySelectorAll('svg');
		const lastIcon = icons[icons.length - 1];

		expect(lastIcon).toHaveAttribute('color', 'var(--color-purple-700)');
	});
});
