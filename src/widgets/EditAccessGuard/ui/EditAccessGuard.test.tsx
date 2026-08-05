import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/shared/libs';

import { getIsAdmin, getIsAuthor, getUserId } from '@/entities/profile';

import { EditAccessGuard } from './EditAccessGuard';

jest.mock('@/shared/libs', () => ({
	...jest.requireActual('@/shared/libs'),
	useAppSelector: jest.fn(),
}));

jest.mock('@/entities/profile', () => ({
	getIsAdmin: jest.fn(),
	getIsAuthor: jest.fn(),
	getUserId: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

const mockUseAppSelector = useAppSelector as jest.Mock;

describe('EditAccessGuard', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('render children for admin', () => {
		mockUseAppSelector.mockImplementation((selector) => {
			if (selector === getIsAdmin) return true;
			if (selector === getIsAuthor) return false;
			if (selector === getUserId) return null;

			return undefined;
		});

		render(
			<EditAccessGuard redirectTo="redirect">
				<p>access</p>
			</EditAccessGuard>,
		);

		expect(screen.getByText('access')).toBeInTheDocument();
	});

	test('render for the entitys author', () => {
		mockUseAppSelector.mockImplementation((selector) => {
			if (selector === getIsAdmin) return false;
			if (selector === getIsAuthor) return true;
			if (selector === getUserId) return '1';

			return undefined;
		});

		render(
			<EditAccessGuard redirectTo="redirect" authorId="1">
				<p>access</p>
			</EditAccessGuard>,
		);

		expect(screen.getByText('access')).toBeInTheDocument();
	});

	test('render for a user with the "author" role who is not the entitys author', () => {
		mockUseAppSelector.mockImplementation((selector) => {
			if (selector === getIsAdmin) return false;
			if (selector === getIsAuthor) return true;
			if (selector === getUserId) return '2';

			return undefined;
		});

		render(
			<EditAccessGuard redirectTo="redirect" authorId="1">
				<p>access</p>
			</EditAccessGuard>,
		);
		expect(screen.getByTestId('Stub')).toBeInTheDocument();
	});

	test('render for a user without access rights', () => {
		mockUseAppSelector.mockImplementation((selector) => {
			if (selector === getIsAdmin) return false;
			if (selector === getIsAuthor) return false;
			if (selector === getUserId) return null;

			return undefined;
		});

		render(
			<EditAccessGuard redirectTo="redirect" authorId="1">
				<p>access</p>
			</EditAccessGuard>,
		);

		expect(screen.getByTestId('Stub')).toBeInTheDocument();
	});

	test('redirect event', () => {
		const mockNavigate = jest.fn();

		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

		mockUseAppSelector.mockImplementation((selector) => {
			if (selector === getIsAdmin) return false;
			if (selector === getIsAuthor) return false;
			if (selector === getUserId) return null;
			return undefined;
		});

		render(
			<EditAccessGuard redirectTo="redirect" authorId="1">
				<p>access</p>
			</EditAccessGuard>,
		);

		fireEvent.click(screen.getByRole('button'));

		expect(mockNavigate).toHaveBeenCalledWith('redirect');
	});
});
