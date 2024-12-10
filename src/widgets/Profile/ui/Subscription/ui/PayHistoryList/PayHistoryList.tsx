import { useState } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';

import { IPayHistory } from '../../types/types';
import { PayHistoryItem } from '../PayHistoryItem';
import { SubscriptionPagination } from '../SubscriptionPagination/SubscriptionPagination';

import styles from './PayHistoryList.module.css';

interface IPayHistoryListProps {
	payHistories: IPayHistory[];
}

export const PayHistoryList = ({ payHistories }: IPayHistoryListProps) => {
	const [pageNumber, setPageNumber] = useState(1);
	const { t } = useI18nHelpers(i18Namespace.subscription);

	return (
		<Flex direction="column" gap="40">
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
