import { parseISO } from 'date-fns';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { DATE_FORMATS } from '@/shared/constants/dateFormats';
import { formatDate } from '@/shared/helpers/formatDate';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import { UnsubscribeButton } from '@/features/subscription/UnsubscribeButton';

import { IPayHistory } from '../../types/types';
import { PayHistoryList } from '../PayHistoryList';

import styles from './Subscribe.module.css';

export const SubscriptionTab = () => {
	const { t } = useI18nHelpers(i18Namespace.subscription);

	const { tWithPlural } = useI18nHelpers(i18Namespace.subscription);

	const payHistories: IPayHistory[] = [
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

	/**
	 *  `30` - Общее кол-во дней
	 *
	 *  `20` - оставшиеся дни
	 */
	const progress = ((30 - 20) / 30) * 100;

	const { D_MM_YYYY } = DATE_FORMATS;

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
				<ProgressBar progress={progress} progressLabel={tWithPlural(Subscription.DAYS_LEFT, 22)} />
				<p className={styles.text}>
					{tWithPlural(
						Subscription.SUBSCRIPTION_RENEWAL,
						undefined,
						formatDate(parseISO(payHistories[0].payDate), D_MM_YYYY),
					)}
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
