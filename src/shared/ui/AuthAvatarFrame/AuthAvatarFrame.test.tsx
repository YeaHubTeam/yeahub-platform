import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs/jest';

import { AuthAvatarFrame } from './AuthAvatarFrame';

describe('AuthAvatarFrame', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render AvatarWithoutPhoto inside border wrapper when link is not provided', () => {
		renderComponent(<AuthAvatarFrame link={null} />);

		const wrapper = screen.getByTestId('AuthAvatarFrame_Border');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('border');

		expect(screen.getByTestId('AvatarWithoutPhoto_Wrapper')).toBeInTheDocument();
	});

	test('should render user avatar image inside wrapper when link is provided', () => {
		const testLink = 'https://example.com/avatar.png';
		renderComponent(<AuthAvatarFrame link={testLink} />);

		const wrapper = screen.getByTestId('AuthAvatarFrame_Wrapper');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('wrapper');

		const img = screen.getByRole('img', { name: /User Avatar/i });
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', testLink);
		expect(img).toHaveAttribute('alt', 'User Avatar');
		expect(img).toHaveClass('avatar');
	});
});
