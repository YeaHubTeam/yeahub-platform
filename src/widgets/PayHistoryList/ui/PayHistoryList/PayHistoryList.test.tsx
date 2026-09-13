import { fireEvent, screen } from '@testing-library/react';
import { parseISO } from 'date-fns';

import { Subscription, i18n } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { renderComponent } from '@/shared/libs';
import { setupMockServer } from '@/shared/msw';

import { paymentsMock, paymentHandlers } from '@/entities/payment';
import { profileReducer } from '@/entities/profile';

import { PayHistoryList } from './PayHistoryList';

setupMockServer(paymentHandlers);

const initialState = {
	profile: {
		fullProfile: {
			id: 'testId',
		},
	},
};

const render = () => {
	renderComponent(<PayHistoryList />, {
		initialState,
		reducers: { profile: profileReducer },
	});
};

const getPaymentDates = (start: number, end: number) =>
	paymentsMock.data
		.slice(start, end)
		.map(({ createdAt }) => formatDate(parseISO(createdAt), 'd MMMM yyyy'));

const expectPaymentDates = async (dates: string[]) => {
	for (const date of dates) {
		expect(await screen.findByText(date)).toBeInTheDocument();
	}
};

const expectPaymentDatesNotToBeInDocument = (dates: string[]) => {
	for (const date of dates) {
		expect(screen.queryByText(date)).not.toBeInTheDocument();
	}
};

describe('PayHistoryList', () => {
	describe('render', () => {
		test('should render payment history with first elements', async () => {
			render();

			expect(
				screen.getByRole('heading', { name: `${i18n.t(Subscription.PAY_HISTORY)}` }),
			).toBeInTheDocument();

			const expectedDates = getPaymentDates(0, paymentsMock.limit);

			for (const date of expectedDates) {
				expect(await screen.findByText(date)).toBeInTheDocument();
			}
		});
	});

	describe('actions', () => {
		test('should change payment history when page is changed', async () => {
			render();

			const firstPageDates = getPaymentDates(0, paymentsMock.limit);
			const secondPageDates = getPaymentDates(paymentsMock.limit, paymentsMock.limit * 2);

			await expectPaymentDates(firstPageDates);

			const nextPagePaginationButton = screen.getByLabelText('forward button');
			const prevPagePaginationButton = screen.getByLabelText('back button');

			fireEvent.click(nextPagePaginationButton);
			await expectPaymentDates(secondPageDates);
			expectPaymentDatesNotToBeInDocument(firstPageDates);

			fireEvent.click(prevPagePaginationButton);
			await expectPaymentDates(firstPageDates);
			expectPaymentDatesNotToBeInDocument(secondPageDates);
		});
	});
});
