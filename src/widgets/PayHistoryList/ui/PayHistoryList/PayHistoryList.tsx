import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Pagination } from '@/shared/ui/Pagination';
import { Text } from '@/shared/ui/Text';

import { useGetPaymentsHistoryQuery } from '@/entities/payment';

import { PayHistoryItem } from '../PayHistoryItem/PayHistoryItem';

import styles from './PayHistoryList.module.css';

export const PayHistoryList = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const userId = useAppSelector((state) => state.profile.fullProfile?.id || '');

	const queryParams = useMemo(
		() => ({
			id: userId,
			params: { page: pageNumber },
		}),
		[userId, pageNumber],
	);

	const { data: payHistories } = useGetPaymentsHistoryQuery(queryParams);

	const payments = payHistories?.data || [];
	const totalPages =
		payHistories?.total && payHistories?.limit
			? Math.ceil(payHistories.total / payHistories.limit)
			: 0;
	const { t } = useTranslation(i18Namespace.subscription);

	const onPrevPageClick = () => {
		setPageNumber(pageNumber - 1);
	};

	const onNextPageClick = () => {
		setPageNumber(pageNumber + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		setPageNumber(newPage);
	};

	return (
		<Flex direction="column" gap="24" className={styles.wrapper}>
			<Text variant="head3" className={styles.title}>
				{t(Subscription.PAY_HISTORY)}
			</Text>
			<Flex gap="14" direction="column">
				{payments.map((payment) => (
					<PayHistoryItem payHistory={payment} key={payment.orderId} />
				))}
			</Flex>
			{totalPages > 1 && (
				<div className={styles['pagination-wrapper']}>
					<Pagination
						onPrevPageClick={onPrevPageClick}
						onNextPageClick={onNextPageClick}
						onChangePage={onPaginationButtonClick}
						page={pageNumber}
						totalPages={totalPages}
					/>
				</div>
			)}
		</Flex>
	);
};
