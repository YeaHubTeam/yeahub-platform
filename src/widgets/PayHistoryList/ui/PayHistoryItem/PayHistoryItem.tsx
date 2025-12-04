import { parseISO } from 'date-fns';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { formatDate } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import type { Payment } from '@/entities/payment';

import styles from './PayHistoryItem.module.css';

interface PayHistoryItemProps {
	payHistory: Payment;
}

export const PayHistoryItem = ({ payHistory }: PayHistoryItemProps) => {
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
