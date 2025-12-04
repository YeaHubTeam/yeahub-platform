import { screen } from '@testing-library/react';

import { Landing, ROUTES } from '@/shared/config';
import { renderComponent } from '@/shared/libs/jest';

import { useProfileQuery } from '@/entities/auth';

import { HeaderAuthDesktop } from './HeaderAuthDesktop';

jest.mock('@/entities/auth', () => {
	const actual = jest.requireActual('@/entities/auth');
	return {
		...actual,
		useProfileQuery: jest.fn(),
	};
});

describe('HeaderAuthDesktop', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render AuthorizedBlock with username and avatar when user is logged in', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({
			data: { username: 'John Doe', avatarUrl: 'https://example.com/avatar.png' },
		});

		renderComponent(<HeaderAuthDesktop />);

		const wrapper = screen.getByTestId('AuthorizedBlock_Wrapper');
		expect(wrapper).toBeInTheDocument();

		const usernameEl = screen.getByTestId('UserName');
		expect(usernameEl).toHaveTextContent('John Doe');

		const avatarFrame = screen.getByTestId('AuthAvatarFrame_Wrapper');
		expect(avatarFrame).toBeInTheDocument();
	});

	test('should render login and register buttons when user is not logged in', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({ data: null });

		renderComponent(<HeaderAuthDesktop />);

		const loginLink = screen.getByRole('link', { name: Landing.LOGIN });
		expect(loginLink).toHaveAttribute('href', ROUTES.auth.login.page);

		const loginBtn = screen.getByTestId('LoginButton');
		expect(loginBtn).toBeInTheDocument();
		expect(loginBtn).toHaveClass('login-link');
		expect(loginBtn).toHaveTextContent(Landing.LOGIN);

		const registerLink = screen.getByRole('link', { name: Landing.REGISTER });
		expect(registerLink).toHaveAttribute('href', ROUTES.auth.register.page);

		const registerBtn = screen.getByTestId('RegisterButton');
		expect(registerBtn).toBeInTheDocument();
		expect(registerBtn).toHaveClass('register-button');
		expect(registerBtn).toHaveTextContent(Landing.REGISTER);
	});
});
