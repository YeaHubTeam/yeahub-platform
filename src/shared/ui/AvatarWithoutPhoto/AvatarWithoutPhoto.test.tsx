import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest/renderComponent/renderComponent';

import { AvatarWithoutPhoto } from './AvatarWithoutPhoto';

describe('AvatarWithoutPhoto', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		renderComponent(<AvatarWithoutPhoto />);
	});

	test('should render wrapper with correct class', () => {
		const wrapper = screen.getByTestId('AvatarWithoutPhoto_Wrapper');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('avatar-wrapper');
	});

	test('should render SVG icon with correct class and accessibility attributes', () => {
		const icon = screen.getByRole('img', { name: /Аватар пользователя/i });
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass('avatar-icon');
		expect(icon).toHaveAttribute('focusable', 'false');
		expect(icon).toHaveAttribute('aria-label', 'Аватар пользователя');
	});
});
