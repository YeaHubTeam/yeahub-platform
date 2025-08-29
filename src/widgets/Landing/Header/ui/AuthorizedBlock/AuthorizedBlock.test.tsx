import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';

import { AuthorizedBlock } from './AuthorizedBlock';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('AuthorizedBlock', () => {
	const mockNavigate = jest.fn();

	const renderWithRouter = (ui: React.ReactNode) => render(<MemoryRouter>{ui}</MemoryRouter>);

	const checkUsernameAndWrappers = (username: string) => {
		const usernameEl = screen.getByTestId('UserName');
		expect(usernameEl).toBeInTheDocument();
		expect(usernameEl).toHaveClass('user-name');
		expect(usernameEl).toHaveTextContent(username);

		const userWrapper = screen.getByTestId('UserWrapper');
		expect(userWrapper).toHaveClass('user-wrapper');

		const mainWrapper = screen.getByTestId('AuthorizedBlock_Wrapper');
		expect(mainWrapper).toHaveClass('wrapper');
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	});

	test('should render AuthAvatarFrame with avatar image when avatarURL is provided', () => {
		const username = 'John Doe';
		const avatarURL = 'https://example.com/avatar.png';
		renderWithRouter(<AuthorizedBlock username={username} avatarURL={avatarURL} />);

		checkUsernameAndWrappers(username);

		const avatarFrame = screen.getByTestId('AuthAvatarFrame_Wrapper');
		expect(avatarFrame).toBeInTheDocument();
		expect(avatarFrame).toHaveClass('wrapper');
	});

	test('should render AvatarWithoutPhoto when avatarURL is not provided', () => {
		const username = 'John Doe';
		renderWithRouter(<AuthorizedBlock username={username} avatarURL={null} />);

		checkUsernameAndWrappers(username);

		const avatarFrame = screen.getByTestId('AuthAvatarFrame_Border');
		expect(avatarFrame).toBeInTheDocument();
		expect(avatarFrame).toHaveClass('border');

		expect(screen.getByTestId('AvatarWithoutPhoto_Wrapper')).toBeInTheDocument();
	});

	test('should navigate to platform route when user wrapper is clicked', () => {
		const username = 'John Doe';
		renderWithRouter(<AuthorizedBlock username={username} avatarURL={null} />);

		const userWrapper = screen.getByTestId('UserWrapper');
		userWrapper.click();

		expect(mockNavigate).toHaveBeenCalledWith(ROUTES.platformRoute);
	});
});
