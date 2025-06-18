import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { PayHistory } from '../../types/types';
import { PayHistoryItem } from '../PayHistoryItem/PayHistoryItem';
import { SubscriptionPagination } from '../SubscriptionPagination/SubscriptionPagination';

import styles from './PayHistoryList.module.css';

interface PayHistoryListProps {
	payHistories: PayHistory[];
}

export const PayHistoryList = ({ payHistories }: PayHistoryListProps) => {
	const [pageNumber, setPageNumber] = useState(1);
	const { t } = useTranslation(i18Namespace.subscription);

	return (
		<Flex direction="column" gap="24" className={styles.wrapper}>
			<h3 className={styles.title}>{t(Subscription.PAY_HISTORY)}</h3>
			<Flex gap="14" direction="column">
				{payHistories.map((payHistory) => (
					<PayHistoryItem key={payHistory.id} payHistory={payHistory} />
				))}
			</Flex>
			<SubscriptionPagination currentPage={pageNumber} onPageChange={setPageNumber} />
		</Flex>
	);
};
