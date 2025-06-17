import { differenceInDays, getDaysInMonth } from 'date-fns';
import { useTranslation } from 'react-i18next';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';
import { useGetUserSubscriptionQuery } from '@/entities/subscription';

import { UnsubscribeButton } from '@/features/subscriptions/unsubscribe';

// import { PayHistory } from '../../types/types';
// import { PayHistoryList } from '../PayHistoryList/PayHistoryList';

import styles from './PremiumSubscriptionTab.module.css';

export const PremiumSubscriptionTab = () => {
	const { t } = useTranslation(i18Namespace.subscription);
	const userId = useAppSelector(getFullProfile)?.id;
	const { data } = useGetUserSubscriptionQuery(userId ?? '');

	const endDate = data?.[0]?.endDate || '';
	const createDate = data?.[0]?.createDate || '';

	const restDays = differenceInDays(endDate, new Date());
	const daysInMonth = getDaysInMonth(createDate);

	// const payHistories: PayHistory[] = [
	// 	{
	// 		id: 1,
	// 		status: 'pending',
	// 		payDate: '2024-11-20T09:07:45.647Z',
	// 	},
	// 	{
	// 		id: 2,
	// 		status: 'pending',
	// 		payDate: '2024-11-21T09:07:45.647Z',
	// 	},
	// 	{
	// 		id: 3,
	// 		status: 'success',
	// 		payDate: '2024-11-23T09:07:45.647Z',
	// 	},
	// 	{
	// 		id: 4,
	// 		status: 'success',
	// 		payDate: '2024-11-25T09:07:45.647Z',
	// 	},
	// 	{
	// 		id: 5,
	// 		status: 'pending',
	// 		payDate: '2024-11-28T09:07:45.647Z',
	// 	},
	// ];

	//const { D_MM_YYYY } = DATE_FORMATS;

	return (
		<>
			<Flex gap="20" direction="column" className={styles.wrapper}>
				<Flex gap="12" direction="column">
					<Flex gap="12" align="center">
						<SealCheck className={styles.svg} />
						<h3 className={styles['card-title']}>{t(Subscription.TARIFF_PREMIUM)}</h3>
					</Flex>
					<p className={styles.text}>{t(Subscription.SUBSCRIPTION_GREETING)}</p>
				</Flex>
				<ProgressBar
					currentCount={restDays}
					totalCount={daysInMonth}
					label={t(Subscription.DAYS_LEFT, { count: restDays })}
					variant="large"
				/>
				{/*<p className={styles.text}>
						{t(Subscription.SUBSCRIPTION_RENEWAL, {
							Date: formatDate(parseISO(endDate), D_MM_YYYY),
						})}
					</p> */}
				<Text variant="body3">{t(Subscription.SUBSCRIPTION_ACCESS_WARNING)}</Text>
			</Flex>
			<div className={styles['actions-button']}>
				<Flex direction="row" gap="8">
					<UnsubscribeButton />
				</Flex>
			</div>
			{/*<PayHistoryList payHistories={payHistories} />*/}
		</>
	);
};
