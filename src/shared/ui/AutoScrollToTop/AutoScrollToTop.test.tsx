import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';

import { AutoScrollToTop } from './AutoScrollToTop';

describe('AutoScrollToTop', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'scrollTo', {
			value: jest.fn(),
			writable: true,
		});
		jest.clearAllMocks();
	});

	test('should render children without crashing', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<AutoScrollToTop>
					<div>Test Content</div>
				</AutoScrollToTop>
			</MemoryRouter>,
		);

		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	test('should call window.scrollTo when route changes', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route
						path="/"
						element={
							<AutoScrollToTop>
								<div>
									Home <Link to="/about">About Us</Link>
								</div>
							</AutoScrollToTop>
						}
					/>
					<Route
						path="/about"
						element={
							<AutoScrollToTop>
								<div>About</div>
							</AutoScrollToTop>
						}
					/>
				</Routes>
			</MemoryRouter>,
		);

		expect(window.scrollTo).toHaveBeenCalledTimes(1);

		await user.click(screen.getByText('About Us'));

		expect(window.scrollTo).toHaveBeenCalledTimes(2);
		expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
	});
});
