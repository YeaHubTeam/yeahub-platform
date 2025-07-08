import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { PaymentData, useGetPaymentsHistoryQuery } from '@/entities/payment';
import { getFullProfile } from '@/entities/profile';

import { PayHistoryItem } from '../PayHistoryItem/PayHistoryItem';
import { SubscriptionPagination } from '../SubscriptionPagination/SubscriptionPagination';

import styles from './PayHistoryList.module.css';

export const PayHistoryList = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { t } = useTranslation(i18Namespace.subscription);

	const { id: userId } = useAppSelector(getFullProfile);
	const { data: payHistories } = useGetPaymentsHistoryQuery({
		id: userId,
		params: { page: pageNumber },
	});

	return (
		<Flex direction="column" gap="24" className={styles.wrapper}>
			<h3 className={styles.title}>{t(Subscription.PAY_HISTORY)}</h3>
			<Flex gap="14" direction="column">
				{payHistories?.data.map((payment: PaymentData) => (
					<PayHistoryItem payHistory={payment} key={payment.orderId} />
				))}
			</Flex>
			<SubscriptionPagination
				currentPage={pageNumber}
				onPageChange={setPageNumber}
				totalPage={payHistories?.total}
				limitCount={payHistories?.limit}
			/>
		</Flex>
	);
};
