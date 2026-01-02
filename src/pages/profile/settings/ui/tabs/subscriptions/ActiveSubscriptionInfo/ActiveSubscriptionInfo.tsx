import { differenceInDays, formatDate, getDaysInMonth, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

import SealCheck from '@/shared/assets/icons/sealCheck.svg';
import { i18Namespace, Subscription } from '@/shared/config';
import { DATE_FORMATS, useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';
import { getActiveSubscription } from '@/entities/subscription';

import { UnsubscribeButton } from '../UnsubscribeButton/UnsubscribeButton';

import styles from './ActiveSubscriptionInfo.module.css';

export const calculateSubscriptionDays = (endDate: Date | '', createDate: Date | '') => {
	if (!endDate || !createDate) {
		return {
			restDays: 0,
			daysInMonth: 0,
		};
	}

	const restDays = Math.max(0, differenceInDays(endDate, new Date()));
	const daysInMonth = getDaysInMonth(createDate);

	return {
		restDays,
		daysInMonth,
	};
};

interface ActiveSubscriptionInfoProps {
	renderActions?: () => React.ReactNode;
}

export const ActiveSubscriptionInfo = ({ renderActions }: ActiveSubscriptionInfoProps) => {
	const { t } = useTranslation(i18Namespace.subscription);
	const { subscriptions } = useAppSelector(getFullProfile);
	const activeSubscriptions = useAppSelector(getActiveSubscription);
	const subscriptionState = activeSubscriptions?.state || '';
	const endDate = activeSubscriptions?.endDate || '';
	const createDate = activeSubscriptions?.createDate || '';

	const parsedEndDate = endDate ? parseISO(endDate) : '';
	const parsedCreateDate = createDate ? parseISO(createDate) : '';

	const { restDays, daysInMonth } = calculateSubscriptionDays(parsedEndDate, parsedCreateDate);
	const { D_MM_YYYY } = DATE_FORMATS;

	return (
		<div className={styles.wrapper}>
			<Flex gap="20" direction="column">
				<Flex gap="12" direction="column">
					<Flex gap="12" align="center">
						<SealCheck className={styles.icon} />
						<Text variant="head3">{t(Subscription.TARIFF_PREMIUM)}</Text>
					</Flex>
					<Text variant="body3">{t(Subscription.SUBSCRIPTION_GREETING)}</Text>
				</Flex>
				<ProgressBar
					currentCount={restDays}
					totalCount={daysInMonth}
					label={t(Subscription.DAYS_LEFT, { count: restDays })}
					variant="large"
				/>
				<Text variant="body3">
					{t(
						subscriptionState === 'active'
							? Subscription.SUBSCRIPTION_RENEWAL
							: Subscription.SUBSCRIPTION_CANCELED,
						{
							Date: formatDate(parseISO(endDate), D_MM_YYYY, { locale: ru }),
						},
					)}
				</Text>
				<Text variant="body3">{t(Subscription.SUBSCRIPTION_ACCESS_WARNING)}</Text>
			</Flex>
			{subscriptions.length > 0 && subscriptionState === 'active' && (
				<div className={styles.actions}>
					<Flex direction="row" gap="8">
						{renderActions ? renderActions() : <UnsubscribeButton />}
					</Flex>
				</div>
			)}
		</div>
	);
};
