import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

import SealCheck from '@/shared/assets/icons/SealCheck.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { DATE_FORMATS } from '@/shared/constants/dateFormats';
import { formatDate } from '@/shared/helpers/formatDate';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import { useProfileQuery } from '@/entities/auth';

import { AgreementForm } from '@/features/subscription';
import { UnsubscribeButton } from '@/features/subscription';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { FaqList } from '@/widgets/FaqList';

import { PayHistory } from '../../types/types';
import { PayHistoryList } from '../PayHistoryList/PayHistoryList';

import styles from './SubscriptionTab.module.css';

export const SubscriptionTab = () => {
	const { t } = useTranslation(i18Namespace.subscription);
	const roles = useProfileQuery();
	const { isMobile } = useScreenSize();

	const hasPremium = roles.data?.userRoles.some((role) => role.name === 'candidate-premium');

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

	const faqList = [
		{
			id: 1,
			question: t(Subscription.SUBSCRIPTION_FAQ_FIRST_QUESTION),
			answer: t(Subscription.SUBSCRIPTION_FAQ_FIRST_ANSWER),
		},
		{
			id: 2,
			question: t(Subscription.SUBSCRIPTION_FAQ_SECOND_QUESTION),
			answer: t(Subscription.SUBSCRIPTION_FAQ_SECOND_ANSWER),
		},
		{
			id: 3,
			question: t(Subscription.SUBSCRIPTION_FAQ_THIRD_QUESTION),
			answer: t(Subscription.SUBSCRIPTION_FAQ_THIRD_ANSWER),
		},
		{
			id: 4,
			question: t(Subscription.SUBSCRIPTION_FAQ_FOURTH_QUESTION),
			answer: t(Subscription.SUBSCRIPTION_FAQ_FOURTH_ANSWER),
		},
	];

	/**
	 *  `30` - Общее кол-во дней
	 *
	 *  `20` - оставшиеся дни
	 */
	const progress = 20;

	const { D_MM_YYYY } = DATE_FORMATS;

	return (
		<>
			{hasPremium ? (
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
							label={t(Subscription.DAYS_LEFT, { count: 22 })}
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
			) : (
				<Flex direction="column" gap={isMobile ? '40' : '60'}>
					<AgreementForm />
					<FaqList faqList={faqList} />
				</Flex>
			)}
		</>
	);
};
