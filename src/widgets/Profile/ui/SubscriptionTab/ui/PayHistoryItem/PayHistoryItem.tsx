import { parseISO } from 'date-fns';

import ArrowDownIcon from '@/shared/assets/icons/ArrowDownIcon.svg';
import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { formatDate } from '@/shared/helpers/formatDate';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { PayHistory } from '../../types/types';

import styles from './PayHistoryItem.module.css';

interface PayHistoryItemProps {
	payHistory: PayHistory;
}

export const PayHistoryItem = ({ payHistory }: PayHistoryItemProps) => {
	return (
		<Card key={payHistory.id}>
			<Flex gap="16" align="center">
				<ArrowDownIcon className={styles['arrow-down-icon']} />
				<Flex gap="8" align="center">
					<SealCheck
						className={styles['seal-check']}
						style={{
							fill:
								payHistory.status === 'pending'
									? 'var(--color-yellow-900)'
									: 'var(--color-green-900)',
						}}
					/>
					<span>{formatDate(parseISO(payHistory.payDate), 'd MMMM yyyy')}</span>
				</Flex>
			</Flex>
		</Card>
	);
};
