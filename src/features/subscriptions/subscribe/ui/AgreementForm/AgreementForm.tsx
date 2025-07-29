import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FreeSubIcon from '@/shared/assets/icons/free-sub.svg';
import ProSubIcon from '@/shared/assets/icons/pro-sub.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { SubscriptionCard as SubscriptionCardI18 } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { Text } from '@/shared/ui/Text';
import { parseI18nText } from '@/shared/utils/parseI18nText';

import { isAvailableTrial } from '@/entities/profile';
import {
	PremiumSubscriptionTooltipBody,
	SubscriptionCard,
	subscriptionPrices,
} from '@/entities/subscription';

import { TrialButton } from '@/features/subscriptions/trial';
import {
	PremiumSubscriptionTooltipBody,
	SubscriptionCard,
	subscriptionPrices,
} from '@/entities/subscription';

import { SubscriptionAgreeFormValues } from '../../model/types/subscriptionAgreeTypes';
import { subscriptionAgreeSchema } from '../../model/validation/subscriptionAgreeSchema';
import { SubscribeButton } from '../SubscribeButton';

import styles from './AgreementForm.module.css';

export const AgreementForm = () => {
	const { t } = useTranslation(i18Namespace.subscriptionCard);
	const { isMobile } = useScreenSize();

	const subscriptionMethods = useForm<SubscriptionAgreeFormValues>({
		resolver: yupResolver(subscriptionAgreeSchema),
		mode: 'onTouched',
	});

	const subscriptions = [
		{
			id: 1,
			icon: <FreeSubIcon className={styles['free-sub-icon']} />,
			name: t(SubscriptionCardI18.SUBSCRIPTION_CARD_FREE_TITLE),
			description: t(SubscriptionCardI18.SUBSCRIPTION_CARD_FREE_DESCRIPTION),
			price: 0,
			hasSubscribeButton: false,
			advantages: [
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_FIRST),
					isActive: true,
				},
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_FOURTH_FREE),
					isActive: true,
				},
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_SECOND),
					isActive: false,
				},
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_THIRD),
					isActive: false,
				},
			],
		},
		{
			id: 2,
			icon: <ProSubIcon className={styles['premium-sub-icon']} />,
			name: t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_TITLE),
			description: t(SubscriptionCardI18.SUBSCRIPTION_CARD_PREMIUM_DESCRIPTION),
			tooltipBody: <PremiumSubscriptionTooltipBody />,
			price: subscriptionPrices.price,
			discountedPrice: subscriptionPrices.discountPrice,
			hasSubscribeButton: true,
			advantages: [
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_FIRST),
					isActive: true,
				},
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_SECOND),
					isActive: true,
				},
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_THIRD),
					isActive: true,
				},
				{
					title: t(SubscriptionCardI18.SUBSCRIPTION_CARD_ADVANTAGES_FOURTH_PAID),
					isActive: true,
				},
			],
		},
	];

	const { control } = subscriptionMethods;

	const offerAgreementParts = parseI18nText(
		t(SubscriptionCardI18.SUBSCRIPTION_CARD_PRIVACY_OFFER_AGREEMENT),
	);
	const consentParts = parseI18nText(t(SubscriptionCardI18.SUBSCRIPTION_CARD_PRIVACY_CONSENT));

	const hasTrialSubscriptions = useAppSelector(isAvailableTrial);

	return (
		<Card>
			<FormProvider {...subscriptionMethods}>
				<Flex direction="column">
					<Flex
						direction="column"
						gap={isMobile ? '8' : '12'}
						className={styles['subscription-info']}
					>
						<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
							{t(SubscriptionCardI18.SUBSCRIPTION_TITLE)}
						</Text>
						<Text variant={isMobile ? 'body2' : 'body3'}>
							{t(SubscriptionCardI18.SUBSCRIPTION_DESCRIPTION)}
						</Text>
					</Flex>
					<Flex gap="20" className={styles['subscription-cards']}>
						<SubscriptionCard
							subscription={subscriptions[0]}
							renderSubscribeButton={() => (
								<SubscribeButton className={styles['subscription-button']} />
							)}
							className={styles.free}
						/>
						<SubscriptionCard
							subscription={subscriptions[1]}
							renderSubscribeButton={() => (
								<SubscribeButton className={styles['subscription-button']} />
							)}
							className={styles.premium}
						/>
					</Flex>
					<Flex direction="column" gap="16">
						<Text variant="body1" color="black-600">
							{t(SubscriptionCardI18.SUBSCRIPTION_CARD_PRIVACY_TITLE)}
						</Text>
						<Flex direction="column" gap="8">
							<FormControl
								name="isOfferAgreed"
								control={control}
								className={styles['form-control']}
							>
								{(field) => (
									<Checkbox
										{...field}
										label={
											<Text variant="body1" color="black-600">
												{offerAgreementParts[0]}
												<a href={ROUTES.docs.page} target="_blank" rel="noopener noreferrer">
													{' '}
													{offerAgreementParts[1]}
												</a>
												{offerAgreementParts[2]}
												<a href={ROUTES.docs.page} target="_blank" rel="noopener noreferrer">
													{' '}
													{offerAgreementParts[3]}
												</a>
											</Text>
										}
									/>
								)}
							</FormControl>
							<FormControl
								name="isConsentAgreed"
								control={control}
								className={styles['form-control']}
							>
								{(field) => (
									<Checkbox
										{...field}
										label={
											<Text variant="body1" color="black-600">
												{consentParts[0]}
												<a href={ROUTES.docs.page} target="_blank" rel="noopener noreferrer">
													{' '}
													{consentParts[1]}
												</a>
											</Text>
										}
									/>
								)}
							</FormControl>
						</Flex>
					</Flex>
				</Flex>
			</FormProvider>
		</Card>
	);
};
