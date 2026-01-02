import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Subscription } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';

import { getUserId } from '@/entities/profile';

import { useGetPaymentsHistoryQuery } from '../../../../api/paymentApi';
import { PayHistoryItem } from '../PayHistoryItem/PayHistoryItem';

import styles from './PayHistoryList.module.css';

export const PayHistoryList = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const userId = useAppSelector(getUserId);

	const queryParams = useMemo(
		() => ({
			id: userId,
			params: { page: pageNumber },
		}),
		[userId, pageNumber],
	);

	const { data: payHistories } = useGetPaymentsHistoryQuery(queryParams);

	const payments = payHistories?.data || [];

	const { t } = useTranslation(i18Namespace.subscription);

	return (
		<Flex direction="column" gap="24" className={styles.wrapper}>
			<Text variant="head3">{t(Subscription.PAY_HISTORY)}</Text>
			<Flex gap="14" direction="column">
				{payHistories && (
					<>
						{payments.map((payment) => (
							<PayHistoryItem payHistory={payment} key={payment.orderId} />
						))}
						<TablePagination
							page={pageNumber}
							onChangePage={setPageNumber}
							limit={payHistories.limit}
							total={payHistories.total}
						/>
					</>
				)}
			</Flex>
		</Flex>
	);
};
