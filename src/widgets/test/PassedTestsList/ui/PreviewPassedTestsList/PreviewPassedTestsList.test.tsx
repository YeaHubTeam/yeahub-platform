import { fireEvent, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { TestHistory } from '@/shared/config';
import {
	EMAIL_VERIFY_SETTINGS_TAB,
	SELECT_TARIFF_SETTINGS_TAB,
	renderComponent,
} from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';

import { profileReducer } from '@/entities/profile';
import { TestHistoryItem } from '@/entities/test';

import { PreviewPassedTestsList } from './PreviewPassedTestsList';

const endpoint = 'http://localhost/testing-preparation/test/history/:profileId';
const requestHandler = jest.fn();
const createTest = (number: number): TestHistoryItem => ({
	id: `test-${number}`,
	profileId: 'profile-id',
	testNumber: number,
	startDate: '2026-10-01T10:00:00.000Z',
	endDate: '2026-10-01T11:00:00.000Z',
	fullCount: 20,
	successCount: 15,
	skills: ['JavaScript'],
	response: { answers: [] },
});
const historyResponse = (data: TestHistoryItem[]) => ({
	data,
	page: 1,
	limit: 4,
	total: data.length,
});
const server = setupMockServer([
	http.get(endpoint, ({ request, params }) => {
		requestHandler(new URL(request.url), params.profileId);
		return HttpResponse.json(historyResponse([createTest(1)]));
	}),
]);

const renderHistory = ({ isVerified = true, hasPremium = true } = {}) =>
	renderComponent(<PreviewPassedTestsList />, {
		reducers: { profile: profileReducer },
		initialState: {
			profile: {
				fullProfile: {
					isVerified,
					activeProfile: { id: 'profile-id' },
					userRoles: [{ name: hasPremium ? 'candidate-premium' : 'candidate' }],
				},
			},
		},
	});

describe('PreviewPassedTestsList', () => {
	test('loads history for the active profile and displays the date and answer counts', async () => {
		renderHistory();

		const result = await screen.findByText('15');
		const item = result.closest('li');
		expect(item).not.toBeNull();
		expect(within(item!).getByText('5')).toBeInTheDocument();
		expect(within(item!).getByText('01/10/2026')).toBeInTheDocument();
		expect(screen.getByText(TestHistory.LINK).closest('a')).toHaveAttribute(
			'href',
			'/testing/history',
		);
		expect(requestHandler).toHaveBeenCalledTimes(1);
		const [url, profileId] = requestHandler.mock.calls[0];
		expect(profileId).toBe('profile-id');
		expect(url.searchParams.get('limit')).toBe('3');
		expect(url.searchParams.get('startAfter')).toBe(new Date(0).toISOString());
		expect(Number.isNaN(Date.parse(url.searchParams.get('startBefore')))).toBe(false);
	});

	test('renders multiple results without duplicate entries and limits the preview to four', async () => {
		server.use(
			http.get(endpoint, () =>
				HttpResponse.json(
					historyResponse(
						[1, ...Array.from({ length: 10000 }, (_, index) => index + 1)].map(createTest),
					),
				),
			),
		);
		renderHistory();

		await screen.findByText(TestHistory.LINK);
		expect(screen.getAllByRole('listitem')).toHaveLength(4);
	});

	test('shows an empty state and disables the history link', async () => {
		server.use(http.get(endpoint, () => HttpResponse.json(historyResponse([]))));
		renderHistory();

		expect(await screen.findByText(TestHistory.EMPTY)).toBeInTheDocument();
		expect(screen.getByText(TestHistory.LINK).closest('a')).toHaveClass('link-disabled');
	});

	test('directs unverified users to email verification without requesting history', () => {
		renderHistory({ isVerified: false });

		expect(screen.getByText(TestHistory.UNVERIFIED)).toBeInTheDocument();
		expect(screen.getByRole('link')).toHaveAttribute('href', EMAIL_VERIFY_SETTINGS_TAB);
		expect(requestHandler).not.toHaveBeenCalled();
	});

	test('directs users without premium to plans without requesting history', () => {
		renderHistory({ hasPremium: false });

		expect(screen.getByText(TestHistory.NO_PREMIUM)).toBeInTheDocument();
		expect(screen.getByRole('link')).toHaveAttribute('href', SELECT_TARIFF_SETTINGS_TAB);
		expect(requestHandler).not.toHaveBeenCalled();
	});

	test('allows retrying a failed request', async () => {
		server.use(http.get(endpoint, () => new HttpResponse(null, { status: 500 })));
		renderHistory();

		expect(await screen.findByText(TestHistory.ERROR)).toBeInTheDocument();
		server.use(http.get(endpoint, () => HttpResponse.json(historyResponse([createTest(1)]))));
		fireEvent.click(screen.getByRole('button', { name: TestHistory.RETRY }));

		expect(await screen.findByText('15')).toBeInTheDocument();
		expect(screen.queryByText(TestHistory.ERROR)).not.toBeInTheDocument();
	});
});
