import { fireEvent, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

import { renderComponent } from '@/shared/libs';

import { FullProfile } from '@/entities/auth';
import { profileReducer } from '@/entities/profile';

import { EditAccessGuard } from './EditAccessGuard';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate,
}));

const renderEditAccessGuard = (
	props: ComponentProps<typeof EditAccessGuard>,
	state: DeepPartial<FullProfile>,
) =>
	renderComponent(<EditAccessGuard {...props} />, {
		initialState: {
			profile: {
				fullProfile: {
					...state,
				},
			},
		},
		reducers: {
			profile: profileReducer,
		},
	});

describe('EditAccessGuard', () => {
	describe('Renders children', () => {
		test('Renders children when isAdmin', () => {
			renderEditAccessGuard(
				{ redirectTo: '/', children: <div>Child Component</div> },
				{ userRoles: [{ name: 'admin' }] },
			);

			expect(screen.getByText('Child Component')).toBeInTheDocument();
		});

		test('Renders children when isAuthor and authorId is correct', () => {
			renderEditAccessGuard(
				{ redirectTo: '/', authorId: 'user-1', children: <div>Child Component</div> },
				{ id: 'user-1', userRoles: [{ name: 'author' }] },
			);

			expect(screen.getByText('Child Component')).toBeInTheDocument();
		});
	});

	describe('Renders stub', () => {
		describe('Default values', () => {
			test('Renders stub when canEdit is false', () => {
				renderEditAccessGuard(
					{
						redirectTo: '/',
						authorId: 'user-1',
						children: <div>Child Component</div>,
					},
					{ id: 'user-2', userRoles: [{ name: 'guest' }] },
				);

				expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
				expect(screen.getByText('stub.access.denied.default.title')).toBeInTheDocument();
			});

			test('Renders stub when not isAuthor', () => {
				renderEditAccessGuard(
					{
						redirectTo: '/',
						authorId: 'user-1',
						children: <div>Child Component</div>,
					},
					{ id: 'user-1', userRoles: [{ name: 'guest' }] },
				);

				expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
				expect(screen.getByText('stub.access.denied.default.title')).toBeInTheDocument();
			});

			test('Renders stub when not userId', () => {
				renderEditAccessGuard(
					{
						redirectTo: '/',
						authorId: 'user-1',
						children: <div>Child Component</div>,
					},
					{ id: 'user-2', userRoles: [{ name: 'author' }] },
				);

				expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
				expect(screen.getByText('stub.access.denied.default.title')).toBeInTheDocument();
			});

			test('Renders stub when userId is undefined', () => {
				renderEditAccessGuard(
					{
						redirectTo: '/',
						children: <div>Child Component</div>,
					},
					{ id: 'user-2', userRoles: [{ name: 'author' }] },
				);

				expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
				expect(screen.getByText('stub.access.denied.default.title')).toBeInTheDocument();
			});

			test('Renders stub when userId is null', () => {
				renderEditAccessGuard(
					{
						redirectTo: '/',
						authorId: null,
						children: <div>Child Component</div>,
					},
					{ id: 'user-2', userRoles: [{ name: 'author' }] },
				);

				expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
				expect(screen.getByText('stub.access.denied.default.title')).toBeInTheDocument();
			});

			test('Renders stub when fullProfile is null', () => {
				renderEditAccessGuard(
					{
						redirectTo: '/',
						children: <div>Child Component</div>,
					},
					{},
				);

				expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
				expect(screen.getByText('stub.access.denied.default.title')).toBeInTheDocument();
			});
		});

		test('Renders stub with not-default values', () => {
			renderEditAccessGuard(
				{
					redirectTo: '/',
					authorId: 'user-1',
					titleStub: 'Нет доступа',
					subtitleStub: 'Попробуйте позже',
					buttonTextStub: 'Вернуться',
					children: <div>Child Component</div>,
				},
				{ id: 'user-2', userRoles: [{ name: 'guest' }] },
			);

			expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
			expect(screen.getByText('Нет доступа')).toBeInTheDocument();
			expect(screen.getByText('Попробуйте позже')).toBeInTheDocument();
			expect(screen.getByText('Вернуться')).toBeInTheDocument();
		});

		test('Stub button click should navigate redirectTo', () => {
			renderEditAccessGuard(
				{
					redirectTo: '/',
					children: <div>Child Component</div>,
				},
				{},
			);

			const button = screen.getByTestId('button');

			fireEvent.click(button);

			expect(mockedUseNavigate).toHaveBeenCalledWith('/');
			expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
		});
	});
});
