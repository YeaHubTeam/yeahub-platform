import { differenceInDays, getDaysInMonth, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { DATE_FORMATS } from '@/shared/constants/dateFormats';
import { formatDate } from '@/shared/helpers/formatDate';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { getActiveSubscription } from '@/entities/subscription';

import { UnsubscribeButton } from '@/features/subscriptions/unsubscribe';

// import { PayHistory } from '../../types/types';
// import { PayHistoryList } from '../PayHistoryList/PayHistoryList';

import styles from './PremiumSubscriptionTab.module.css';

export const PremiumSubscriptionTab = () => {
	const { t } = useTranslation(i18Namespace.subscription);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const activeSubscriptions = useAppSelector(getActiveSubscription);

	const endDate = activeSubscriptions?.endDate || '';
	const createDate = activeSubscriptions?.createDate || '';

	const restDays = Math.max(0, differenceInDays(parseISO(endDate), new Date()));
	const daysInMonth = getDaysInMonth(createDate);

	const hasEndDate = Boolean(endDate);
	const current = hasEndDate ? restDays : 100;
	const total = hasEndDate ? daysInMonth : 100;
	const label = hasEndDate ? t(Subscription.DAYS_LEFT, { count: restDays }) : undefined;

	const isActiveState = activeSubscriptions?.state === 'active';

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

	const { D_MM_YYYY } = DATE_FORMATS;
	const formattedDate = hasEndDate ? formatDate(parseISO(endDate), D_MM_YYYY) : '';

	return (
		<>
			<div className={styles['wrapper-top']}>
				<Flex gap="20" direction="column" className={styles.wrapper}>
					<Flex gap="12" direction="column">
						<Flex gap="12" align="center">
							<SealCheck className={styles.svg} />
							<h3 className={styles['card-title']}>{t(Subscription.TARIFF_PREMIUM)}</h3>
						</Flex>
						<p className={styles.text}>{t(Subscription.SUBSCRIPTION_GREETING)}</p>
					</Flex>
					<ProgressBar currentCount={current} totalCount={total} label={label} variant="large" />
					<Text variant="body3">
						{isActiveState
							? /*t(Subscription.SUBSCRIPTION_RENEWAL, { Date: formattedDate })*/
								t(Subscription.SUBSCRIPTION_ACCESS_WARNING)
							: t(Subscription.SUBSCRIPTION_CANCELED, { Date: formattedDate })}
					</Text>
				</Flex>
				{isActiveState ? (
					<div className={styles['actions-button']}>
						<Flex direction="row" gap="8">
							<UnsubscribeButton />
						</Flex>
					</div>
				) : null}
			</div>
			{/*<PayHistoryList payHistories={payHistories} />*/}
		</>
	);
};
