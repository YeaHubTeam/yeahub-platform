import { screen, fireEvent } from '@testing-library/react';

import { ROUTES } from '@/shared/config';
import { renderComponent } from '@/shared/libs/jest';

import { useProfileQuery } from '@/entities/auth';

import { HeaderAuthMobile } from './HeaderAuthMobile';

jest.mock('@/entities/auth', () => {
	const actual = jest.requireActual('@/entities/auth');
	return {
		...actual,
		useProfileQuery: jest.fn(),
	};
});

export const navigateMock = jest.fn();

jest.mock('react-router-dom', () => {
	const actual = jest.requireActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => {
			const { navigateMock } = require('./HeaderAuthMobile.test.tsx');
			return navigateMock;
		},
	};
});

describe('HeaderAuthMobile', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render AuthorizedBlock when user is logged in with username and avatar', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({
			data: { username: 'John Doe', avatarUrl: 'https://example.com/avatar.png' },
		});

		renderComponent(<HeaderAuthMobile />);

		const wrapper = screen.getByTestId('AuthorizedBlock_Wrapper');
		expect(wrapper).toBeInTheDocument();

		const usernameEl = screen.getByTestId('UserName');
		expect(usernameEl).toHaveTextContent('John Doe');

		const avatarFrame = screen.getByTestId('AuthAvatarFrame_Wrapper');
		expect(avatarFrame).toBeInTheDocument();
	});

	test('should render popover with login and register buttons for unauthenticated user', () => {
		(useProfileQuery as jest.Mock).mockReturnValue({ data: null });

		renderComponent(<HeaderAuthMobile />);

		const iconButton = screen.getByTestId('HeaderAuthMobile_IconButton');
		expect(iconButton).toBeInTheDocument();

		fireEvent.click(iconButton);

		const popoverButtons = screen.getAllByTestId('Button');
		expect(popoverButtons[0]).toBeInTheDocument();
		expect(popoverButtons[1]).toBeInTheDocument();
		expect(popoverButtons).toHaveLength(2);

		fireEvent.click(popoverButtons[0]);
		expect(navigateMock).toHaveBeenCalledWith(ROUTES.auth.login.page);

		navigateMock.mockClear();

		fireEvent.click(iconButton);

		const newPopoverButtons = screen.getAllByTestId('Button');
		fireEvent.click(newPopoverButtons[1]);
		expect(navigateMock).toHaveBeenCalledWith(ROUTES.auth.register.page);
	});
});
