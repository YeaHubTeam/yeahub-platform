import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { HEADER_NAV_LINKS } from '../../model/constants/headerConstants';

import { HeaderNavDesktop } from './HeaderNavDesktop/HeaderNavDesktop';

describe('HeaderNavDesktop', () => {
	test('should render all nav links with correct text', () => {
		renderComponent(<HeaderNavDesktop />);

		HEADER_NAV_LINKS.forEach(({ title }) => {
			const linkEl = screen.getByText(title);
			expect(linkEl).toBeInTheDocument();
		});
	});

	test('should render correct number of nav links', () => {
		renderComponent(<HeaderNavDesktop />);

		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(HEADER_NAV_LINKS.length);
	});

	test('should apply active class to the active link', () => {
		const { link } = HEADER_NAV_LINKS[0];

		renderComponent(<HeaderNavDesktop />, { route: `${link}` });

		const activeLink = screen.getByRole('link', { name: HEADER_NAV_LINKS[0].title });
		expect(activeLink).toHaveClass('active');
	});
});
