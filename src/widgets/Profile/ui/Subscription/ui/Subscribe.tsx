import { useState } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/ArrowDownIcon.svg';
import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import { TariffSelection } from '@/features/subscription/TariffSelection';

import { SubscribePagination } from '../SubscribePagination';

import styles from './Subscribe.module.css';

export const Subscribe = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const payHistories = [
		{
			id: 1,
			status: 'panding',
			date: {
				date: 12,
				month: 'ноября',
				year: 2024,
			},
		},
		{
			id: 2,
			status: 'panding',
			date: {
				date: 14,
				month: 'ноября',
				year: 2024,
			},
		},
		{
			id: 3,
			status: 'success',
			date: {
				date: 20,
				month: 'ноября',
				year: 2024,
			},
		},
		{
			id: 4,
			status: 'success',
			date: {
				date: 21,
				month: 'ноября',
				year: 2024,
			},
		},
		{
			id: 5,
			status: 'panding',
			date: {
				date: 26,
				month: 'ноября',
				year: 2024,
			},
		},
	];

	return (
		<>
			<Flex gap="20" direction="column" className={styles.wrapper}>
				<Flex gap="12" direction="column">
					<Flex gap="12" align="center">
						<SealCheck className={styles.svg} />
						<h3 className={styles['card-title']}>Премиум</h3>
					</Flex>
					<p className={styles.text}>Отличный выбор, теперь вам доступны все функции сервиса</p>
				</Flex>
				<ProgressBar daysLeft={10} totalDays={30} />
				<p className={styles.text}>Платеж будет продлен автоматически 12 ноября 2024</p>
			</Flex>
			<div className={styles['actions-button']}>
				<TariffSelection />
			</div>
			<Flex direction="column" gap="40">
				<h3 className={styles['card-title']}>Ваши предыдущие платежи</h3>
				<Flex gap="14" direction="column">
					{payHistories.map((payHistory) => (
						<Card key={payHistory.id}>
							<Flex gap="16" align="center">
								<ArrowDownIcon className={styles['arrow-down-icon']} />
								<Flex gap="8" align="center">
									<SealCheck
										className={styles.svg}
										style={{
											fill:
												payHistory.status === 'panding'
													? 'var(--color-yellow-900)'
													: 'var(--color-green-900)',
											width: 27,
											height: 27,
										}}
									/>
									<span>{Object.values(payHistory.date).join(' ')}</span>
								</Flex>
							</Flex>
						</Card>
					))}
				</Flex>
				<SubscribePagination currentPage={pageNumber} onPageChange={setPageNumber} />
			</Flex>
		</>
	);
};
