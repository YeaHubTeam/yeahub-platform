import { fireEvent, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';

import { ROUTES } from '@/shared/config';
import {
	EMAIL_VERIFY_SETTINGS_TAB,
	SELECT_TARIFF_SETTINGS_TAB,
	renderComponent,
	useAppSelector,
} from '@/shared/libs';
import type { Stub } from '@/shared/ui/Stub';
import type { TablePagination } from '@/shared/ui/TablePagination';

import { getFullProfile, getHasPremiumAccess, getIsVerified } from '@/entities/profile';
import type { RoleName } from '@/entities/user';

import { PageWrapper } from './PageWrapper';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigate,
}));

jest.mock('@/shared/libs', () => ({
	...jest.requireActual('@/shared/libs'),
	useAppSelector: jest.fn(),
}));

jest.mock('@/shared/ui/Loader', () => ({
	Loader: () => require('react').createElement('div', { 'data-testid': 'loader' }),
}));

jest.mock('@/shared/ui/Stub', () => ({
	Stub: ({ type, title, subtitle, buttonText, onClick }: ComponentProps<typeof Stub>) =>
		require('react').createElement(
			'section',
			{ 'data-testid': 'stub-' + type },
			require('react').createElement('h2', null, title),
			require('react').createElement('p', null, subtitle),
			require('react').createElement('button', { onClick }, buttonText ?? 'Action'),
		),
}));

jest.mock('@/shared/ui/TablePagination', () => ({
	TablePagination: ({ page, limit, total, onChangePage }: ComponentProps<typeof TablePagination>) =>
		require('react').createElement(
			'div',
			{ 'data-testid': 'pagination', 'data-page': page, 'data-limit': limit, 'data-total': total },
			require('react').createElement('button', { onClick: () => onChangePage(3) }, 'Page 3'),
		),
}));

type Props = ComponentProps<typeof PageWrapper>;
type Profile = Partial<ReturnType<typeof getFullProfile>>;
const mockedUseAppSelector = useAppSelector as jest.Mock;

const createProfile = (roles: RoleName[] = ['candidate']): Profile => ({
	userRoles: roles.map((name, index) => ({ id: index + 1, name, permissions: [] })),
});

const paginationOptions = { page: 2, limit: 10, total: 50, onChangePage: jest.fn() };

const renderWrapper = (props: Partial<Props> = {}) => {
	const defaultProps: Props = {
		hasData: true,
		stubs: {},
		content: <div>Page content</div>,
		children: ({ content, pagination }) => (
			<div>
				{content}
				{pagination}
			</div>
		),
	};
	return renderComponent(<PageWrapper {...defaultProps} {...props} />);
};

describe('PageWrapper', () => {
	let isVerified: boolean;
	let hasPremiumAccess: boolean;
	let profile: Profile | undefined;

	beforeEach(() => {
		jest.clearAllMocks();

		isVerified = true;
		hasPremiumAccess = true;
		profile = createProfile();

		mockedUseAppSelector.mockImplementation((selector: unknown) => {
			switch (selector) {
				case getIsVerified:
					return isVerified;
				case getHasPremiumAccess:
					return hasPremiumAccess;
				case getFullProfile:
					return profile;
				default:
					throw new Error('Unexpected selector');
			}
		});
	});

	describe('render', () => {
		test('should allow access when a role matches beyond first positions', () => {
			profile = createProfile(['candidate', 'author']);

			renderWrapper({ roles: ['admin', 'author'] });

			expect(screen.getByText('Page content')).toBeInTheDocument();
		});
	});

	describe('loading', () => {
		test('should render skeleton without calling children', () => {
			const children = jest.fn(() => null);

			renderWrapper({
				isLoading: true,
				skeleton: <div>Skeleton</div>,
				children,
				paginationOptions,
			});

			expect(screen.getByText('Skeleton')).toBeInTheDocument();
			expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
			expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
			expect(children).not.toHaveBeenCalled();
		});

		test('should render loader when skeleton is missing', () => {
			const children = jest.fn(() => null);

			renderWrapper({ isLoading: true, children });

			expect(screen.getByTestId('loader')).toBeInTheDocument();
			expect(children).not.toHaveBeenCalled();
		});
	});

	describe('access stub buttons', () => {
		test('should navigate to interview when custom role handler is missing', () => {
			renderWrapper({
				roles: ['admin'],
				stubs: { 'access-denied': {} },
			});

			fireEvent.click(screen.getByRole('button', { name: 'Action' }));

			expect(mockedNavigate).toHaveBeenCalledTimes(1);
			expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.interview.page);
		});

		test('should call custom role handler instead of navigating', () => {
			const onClick = jest.fn();

			renderWrapper({
				roles: ['admin'],
				stubs: { 'access-denied': { onClick } },
			});

			fireEvent.click(screen.getByRole('button', { name: 'Action' }));

			expect(onClick).toHaveBeenCalledTimes(1);
			expect(mockedNavigate).not.toHaveBeenCalled();
		});

		test('should navigate to verification settings when custom handler is missing', () => {
			isVerified = false;

			renderWrapper({
				shouldVerify: true,
				stubs: { 'access-denied-verify': {} },
			});

			fireEvent.click(screen.getByRole('button', { name: 'Action' }));

			expect(mockedNavigate).toHaveBeenCalledTimes(1);
			expect(mockedNavigate).toHaveBeenCalledWith(EMAIL_VERIFY_SETTINGS_TAB);
		});

		test('should call custom verification handler instead of navigating', () => {
			isVerified = false;
			const onClick = jest.fn();

			renderWrapper({
				shouldVerify: true,
				stubs: { 'access-denied-verify': { onClick } },
			});

			fireEvent.click(screen.getByRole('button', { name: 'Action' }));

			expect(onClick).toHaveBeenCalledTimes(1);
			expect(mockedNavigate).not.toHaveBeenCalled();
		});

		test('should navigate to tariff settings when custom handler is missing', () => {
			hasPremiumAccess = false;

			renderWrapper({
				shouldPremium: true,
				stubs: { 'access-denied-subscription': {} },
			});

			fireEvent.click(screen.getByRole('button', { name: 'Action' }));

			expect(mockedNavigate).toHaveBeenCalledTimes(1);
			expect(mockedNavigate).toHaveBeenCalledWith(SELECT_TARIFF_SETTINGS_TAB);
		});

		test('should call custom subscription handler instead of navigating', () => {
			hasPremiumAccess = false;
			const onClick = jest.fn();

			renderWrapper({
				shouldPremium: true,
				stubs: { 'access-denied-subscription': { onClick } },
			});

			fireEvent.click(screen.getByRole('button', { name: 'Action' }));

			expect(onClick).toHaveBeenCalledTimes(1);
			expect(mockedNavigate).not.toHaveBeenCalled();
		});
	});

	describe('content stubs', () => {
		test('should pass custom error text and handler', () => {
			const onClick = jest.fn();

			renderWrapper({
				hasError: true,
				stubs: {
					error: {
						title: 'Error',
						subtitle: 'Failed',
						buttonText: 'Retry',
						onClick,
					},
				},
			});

			expect(screen.getByRole('heading', { name: 'Error' })).toBeInTheDocument();
			expect(screen.getByText('Failed')).toBeInTheDocument();

			fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

			expect(onClick).toHaveBeenCalledTimes(1);
		});

		test('should pass custom filter-empty text and handler', () => {
			const onClick = jest.fn();

			renderWrapper({
				hasData: false,
				hasFilters: true,
				stubs: {
					'filter-empty': {
						title: 'Filtered',
						subtitle: 'No matches',
						buttonText: 'Reset',
						onClick,
					},
				},
			});

			expect(screen.getByRole('heading', { name: 'Filtered' })).toBeInTheDocument();
			expect(screen.getByText('No matches')).toBeInTheDocument();

			fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

			expect(onClick).toHaveBeenCalledTimes(1);
		});

		test('should pass custom empty text and handler', () => {
			const onClick = jest.fn();

			renderWrapper({
				hasData: false,
				stubs: {
					empty: {
						title: 'Empty',
						subtitle: 'No data',
						buttonText: 'Add',
						onClick,
					},
				},
			});

			expect(screen.getByRole('heading', { name: 'Empty' })).toBeInTheDocument();
			expect(screen.getByText('No data')).toBeInTheDocument();

			fireEvent.click(screen.getByRole('button', { name: 'Add' }));

			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('pagination', () => {
		test('should pass pagination values and selected page to callback', () => {
			renderWrapper({ paginationOptions });

			const pagination = screen.getByTestId('pagination');

			expect(pagination).toHaveAttribute('data-page', '2');
			expect(pagination).toHaveAttribute('data-limit', '10');
			expect(pagination).toHaveAttribute('data-total', '50');

			fireEvent.click(screen.getByRole('button', { name: 'Page 3' }));

			expect(paginationOptions.onChangePage).toHaveBeenCalledTimes(1);
			expect(paginationOptions.onChangePage).toHaveBeenCalledWith(3);
		});
	});
});
