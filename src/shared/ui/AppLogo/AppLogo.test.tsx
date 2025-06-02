import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import logoDark from '@/shared/assets/icons/logoDark.avif';
import logoLight from '@/shared/assets/icons/logoLight.avif';

import { AppLogo, AppLogoProps } from './AppLogo';

jest.mock('@/shared/assets/icons/logoLight.avif', () => 'mockedLogoLight');
jest.mock('@/shared/assets/icons/logoDark.avif', () => 'mockedLogoDark');

type OverridesProps = Partial<AppLogoProps>;

const renderComponent = (props: OverridesProps = {}) => {
	const defaultProps: AppLogoProps = {
		isOpen: true,
		fill: 'black',
		navigateTo: '/dashboard',
		logoType: 'dark',
		navigationFooter: false,
	};

	return render(
		<MemoryRouter>
			<AppLogo {...defaultProps} {...props} />
			<Routes>
				<Route
					path={props.navigateTo || defaultProps.navigateTo}
					element={<div data-testid="test-page">Page</div>}
				/>
			</Routes>
		</MemoryRouter>,
	);
};

describe('AppLogo', () => {
	describe('render with logoType', () => {
		test('should return dark logo when logoType is "dark', () => {
			renderComponent();

			const result = screen.getByTestId('AppLogo_Img');

			expect(result).toHaveAttribute('src', logoDark);
		});

		test('should return dark logo when logoType is "light', () => {
			renderComponent({ logoType: 'light' });

			const result = screen.getByTestId('AppLogo_Img');

			expect(result).toHaveAttribute('src', logoLight);
		});
	});
	describe('render', () => {
		test('with default props', () => {
			renderComponent();

			const navLink = screen.getByTestId('AppLogo_Link');

			expect(navLink).toBeInTheDocument();
			expect(navLink).toHaveAttribute('href', '/dashboard');
			expect(screen.getByTestId('AppLogo_Img')).toBeInTheDocument();
		});
	});
	describe('navigationFooter', () => {
		test('render with logo-image', () => {
			renderComponent({ navigationFooter: false });

			expect(screen.getByTestId('AppLogo_Img')).toBeInTheDocument();
		});
		test('render without logo-image', () => {
			renderComponent({ navigationFooter: true });

			expect(screen.queryByTestId('AppLogo_Img')).not.toBeInTheDocument();
		});
	});
	describe('isOpen', () => {
		test('NavLink have class "center" when isOpen is true', () => {
			renderComponent({ isOpen: true });

			const navLink = screen.getByTestId('AppLogo_Link');

			expect(navLink).toHaveClass('center');
		});
		test('NavLink don`t have class "center" when isOpen is false', () => {
			renderComponent({ isOpen: false });

			const navLink = screen.getByTestId('AppLogo_Link');

			expect(navLink).not.toHaveClass('center');
		});
	});
	describe('navigateTo', () => {
		test('NavLink has "pointer-event-none" class when navigateTo is "#" to disable clicks', () => {
			renderComponent({ navigateTo: '#' });

			const navLink = screen.getByTestId('AppLogo_Link');

			fireEvent.click(navLink);

			expect(navLink).toHaveClass('pointer-event-none');
			expect(screen.queryByTestId('test-page')).not.toBeInTheDocument();
		});
		test('NavLink is clickable when navigateTo is a valid route', () => {
			renderComponent({ navigateTo: '/home' });

			const navLink = screen.getByTestId('AppLogo_Link');

			fireEvent.click(navLink);

			expect(navLink).not.toHaveClass('pointer-event-none');
			expect(screen.getByTestId('test-page')).toBeInTheDocument();
		});
	});
});
