import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AppLogo, AppLogoProps } from './AppLogo';

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
	describe('render', () => {
		test('with default props', () => {
			renderComponent();

			const navLink = screen.getByTestId('NavLink');

			expect(navLink).toBeInTheDocument();
			expect(navLink).toHaveAttribute('href', '/dashboard');
			expect(screen.getByTestId('logo-img')).toBeInTheDocument();
		});
	});
	describe('navigationFooter', () => {
		test('render with logo-image', () => {
			renderComponent({ navigationFooter: false });

			expect(screen.getByTestId('logo-img')).toBeInTheDocument();
		});
		test('render without logo-image', () => {
			renderComponent({ navigationFooter: true });

			expect(screen.queryByTestId('logo-img')).not.toBeInTheDocument();
		});
	});
	describe('isOpen', () => {
		test('NavLink have class "center" when isOpen is true', () => {
			renderComponent({ isOpen: true });

			const navLink = screen.getByTestId('NavLink');

			expect(navLink).toHaveClass('center');
		});
		test('NavLink don`t have class "center" when isOpen is false', () => {
			renderComponent({ isOpen: false });

			const navLink = screen.getByTestId('NavLink');

			expect(navLink).not.toHaveClass('center');
		});
	});
	describe('navigateTo', () => {
		test('NavLink has "pointer-event-none" class when navigateTo is "#" to disable clicks', () => {
			renderComponent({ navigateTo: '#' });

			const navLink = screen.getByTestId('NavLink');

			fireEvent.click(navLink);

			expect(navLink).toHaveClass('pointer-event-none');
			expect(screen.queryByTestId('test-page')).not.toBeInTheDocument();
		});
		test('NavLink is clickable when navigateTo is a valid route', () => {
			renderComponent({ navigateTo: '/home' });

			const navLink = screen.getByTestId('NavLink');

			fireEvent.click(navLink);

			expect(navLink).not.toHaveClass('pointer-event-none');
			expect(screen.getByTestId('test-page')).toBeInTheDocument();
		});
	});
});
