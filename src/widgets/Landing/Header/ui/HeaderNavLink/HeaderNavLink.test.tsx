import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { HeaderNavLink } from './HeaderNavLink';

describe('HeaderNavLink', () => {
	test('should render link with children text and active class when route matches', () => {
		renderComponent(
			<HeaderNavLink link="/test" path="">
				Test Link
			</HeaderNavLink>,
			{ route: '/test' },
		);

		const linkEl = screen.getByRole('link', { name: 'Test Link' });
		expect(linkEl).toBeInTheDocument();
		expect(linkEl).toHaveClass('nav-link', 'link', 'active');
	});

	test('should apply active class when path matches current route', () => {
		renderComponent(
			<HeaderNavLink link="/other" path="/current">
				Other Link
			</HeaderNavLink>,
			{ route: '/current' },
		);

		const linkEl = screen.getByRole('link', { name: 'Other Link' });
		expect(linkEl).toBeInTheDocument();
		expect(linkEl).toHaveClass('nav-link', 'link', 'active');
	});

	test('should not apply active class when link and path do not match current route', () => {
		renderComponent(
			<HeaderNavLink link="/other" path="/something">
				Other Link
			</HeaderNavLink>,
			{ route: '/different' },
		);

		const linkEl = screen.getByRole('link', { name: 'Other Link' });
		expect(linkEl).toBeInTheDocument();
		expect(linkEl).toHaveClass('nav-link', 'link');
	});

	test('should render link correctly when path is not provided', () => {
		renderComponent(
			<HeaderNavLink link="/other" path="">
				Other Link
			</HeaderNavLink>,
			{ route: '/different' },
		);

		const linkEl = screen.getByRole('link', { name: 'Other Link' });
		expect(linkEl).toBeInTheDocument();
		expect(linkEl).toHaveClass('nav-link', 'link');
	});
});
