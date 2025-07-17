import { differenceInDays, formatDate, getDaysInMonth, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { DATE_FORMATS } from '@/shared/constants/dateFormats';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';
import { getActiveSubscription } from '@/entities/subscription';

import { UnsubscribeButton } from '@/features/subscriptions/unsubscribe';

import { PayHistoryList } from '../PayHistoryList/PayHistoryList';

import styles from './PremiumSubscriptionTab.module.css';

export const PremiumSubscriptionTab = () => {
	const { t } = useTranslation(i18Namespace.subscription);
	const { subscriptions } = useAppSelector(getFullProfile);
	const activeSubscriptions = useAppSelector(getActiveSubscription);
	const endDate = activeSubscriptions?.endDate || '';
	const createDate = activeSubscriptions?.createDate || '';

	const restDays = differenceInDays(endDate, new Date());
	const daysInMonth = getDaysInMonth(createDate);
	const { D_MM_YYYY } = DATE_FORMATS;

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
					<ProgressBar
						currentCount={restDays}
						totalCount={daysInMonth}
						label={t(Subscription.DAYS_LEFT, { count: restDays })}
						variant="large"
					/>
					<p className={styles.text}>
						{t(Subscription.SUBSCRIPTION_RENEWAL, {
							Date: formatDate(parseISO(endDate), D_MM_YYYY, { locale: ru }),
						})}
					</p>
					<Text variant="body3">{t(Subscription.SUBSCRIPTION_ACCESS_WARNING)}</Text>
				</Flex>
				{subscriptions.length > 0 ? (
					<div className={styles['actions-button']}>
						<Flex direction="row" gap="8">
							<UnsubscribeButton />
						</Flex>
					</div>
				) : null}
			</div>
			<PayHistoryList />
		</>
	);
};
