import { parseISO } from 'date-fns';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { formatDate } from '@/shared/helpers/formatDate';
import type { Payment } from '@/shared/types/payment';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import styles from './PaymentHistoryItem.module.css';

interface PaymentHistoryItemProps {
	payHistory: Payment;
}

export const PaymentHistoryItem = ({ payHistory }: PaymentHistoryItemProps) => {
	return (
		<Card className={styles['history-item']}>
			<Flex gap="16" align="center">
				<Flex gap="8" align="center">
					<SealCheck
						className={styles['seal-check']}
						style={{
							color:
								payHistory.status === 'CONFIRMED'
									? 'var(--color-yellow-900)'
									: 'var(--color-green-900)',
						}}
					/>
					<span>{formatDate(parseISO(payHistory.createdAt), 'd MMMM yyyy')}</span>
				</Flex>
			</Flex>
		</Card>
	);
};
