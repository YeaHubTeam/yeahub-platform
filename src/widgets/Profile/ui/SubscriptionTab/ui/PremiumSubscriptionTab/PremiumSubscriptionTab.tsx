import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { DATE_FORMATS } from '@/shared/constants/dateFormats';
import { formatDate } from '@/shared/helpers/formatDate';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { getFullProfile } from '@/entities/profile';

import { UnsubscribeButton } from '@/features/subscription/UnsubscribeButton';

import { PayHistory } from '../../types/types';
import { PayHistoryList } from '../PayHistoryList/PayHistoryList';

import styles from './PremiumSubscriptionTab.module.css';
import { useGetUserSubscriptionQuery } from '@/entities/subscription/api/subscriptionApi';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';

const progress = 20;

const { D_MM_YYYY } = DATE_FORMATS;

export const PremiumSubscriptionTab = ({}) => {
	const { t } = useTranslation(i18Namespace.subscription);
	const profile = useAppSelector(getFullProfile);

	const userId = profile?.id;
	const { data } = useGetUserSubscriptionQuery(userId!);
	const subscriptionCreateDate: string | undefined = data?.[0]?.createDate;

	const beenDays = new Date().getTime() - new Date(subscriptionCreateDate!).getTime();
	const thirtyDaysInMilliseconds = 2592000000;

	const timeDifference =
		thirtyDaysInMilliseconds - beenDays === 0
			? thirtyDaysInMilliseconds
			: thirtyDaysInMilliseconds - beenDays;
	const remainingSubscriptionDays = Math.round(timeDifference / (1000 * 3600 * 24));

	const payHistories: PayHistory[] = [
		{
			id: 1,
			status: 'pending',
			payDate: '2024-11-20T09:07:45.647Z',
		},
		{
			id: 2,
			status: 'pending',
			payDate: '2024-11-21T09:07:45.647Z',
		},
		{
			id: 3,
			status: 'success',
			payDate: '2024-11-23T09:07:45.647Z',
		},
		{
			id: 4,
			status: 'success',
			payDate: '2024-11-25T09:07:45.647Z',
		},
		{
			id: 5,
			status: 'pending',
			payDate: '2024-11-28T09:07:45.647Z',
		},
	];

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
					currentCount={progress}
					totalCount={30}
					label={t(Subscription.DAYS_LEFT, { count: remainingSubscriptionDays })}
					variant="large"
				/>
				<p className={styles.text}>
					{t(Subscription.SUBSCRIPTION_RENEWAL, {
						Date: formatDate(parseISO(payHistories[0].payDate), D_MM_YYYY),
					})}
				</p>
			</Flex>
			<div className={styles['actions-button']}>
				<Flex direction="row" gap="8">
					<Button variant="outline" size="L" aria-label="Change tariff plan">
						{t(Subscription.CHANGE_TARIFF_PLAN)}
					</Button>
					<UnsubscribeButton />
				</Flex>
			</div>
			<PayHistoryList payHistories={payHistories} />
		</>
	);
};
