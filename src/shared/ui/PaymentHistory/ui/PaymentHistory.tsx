import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import type { Payment } from '@/shared/types/payment';
import { Flex } from '@/shared/ui/Flex';
import { Pagination } from '@/shared/ui/Pagination';

import styles from './PaymentHistory.module.css';
import { PaymentHistoryItem } from './PaymentHistoryItem/PaymentHistoryItem';

interface PaymentHistoryProps {
	payments: Payment[];
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const PaymentHistory = ({
	payments,
	page,
	totalPages,
	onPageChange,
}: PaymentHistoryProps) => {
	const { t } = useTranslation(i18Namespace.subscription);

	const onPrevPageClick = () => {
		onPageChange(page - 1);
	};

	const onNextPageClick = () => {
		onPageChange(page + 1);
	};

	const onPaginationButtonClick = (newPage: number) => {
		onPageChange(newPage);
	};

	return (
		<Flex direction="column" gap="24" className={styles.wrapper}>
			<h3 className={styles.title}>{t(Subscription.PAY_HISTORY)}</h3>
			<Flex gap="14" direction="column">
				{payments.map((payment) => (
					<PaymentHistoryItem payHistory={payment} key={payment.orderId} />
				))}
			</Flex>
			{totalPages > 1 && (
				<div className={styles['pagination-wrapper']}>
					<Pagination
						onPrevPageClick={onPrevPageClick}
						onNextPageClick={onNextPageClick}
						onChangePage={onPaginationButtonClick}
						page={page}
						totalPages={totalPages}
					/>
				</div>
			)}
		</Flex>
	);
};
