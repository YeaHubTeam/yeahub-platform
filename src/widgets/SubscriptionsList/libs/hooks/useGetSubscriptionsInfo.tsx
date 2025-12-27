import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Subscription } from '@/shared/config';
import { Pallete, useAppSelector } from '@/shared/libs';

import { isAvailableTrial } from '@/entities/profile';
import { SubscriptionCode, useGetSubscriptionsQuery } from '@/entities/subscription';

import { SubscribeButton } from '@/features/subscriptions/subscribe';
import { TrialButton } from '@/features/subscriptions/trial';

import { SubscriptionInfo } from '../../model/types/types';
import {
	premiumBenefits,
	freeBenefits,
	SubscriptionInfoBenefit,
} from '../constants/benefitsConstants';

export const useGetSubscriptionsInfo = (): SubscriptionInfo[] => {
	const { t } = useTranslation(i18Namespace.subscription);
	const { data } = useGetSubscriptionsQuery();
	console.log(data);

	const hasTrialSubscriptions = useAppSelector(isAvailableTrial);

	const visibleSubscriptions: SubscriptionCode[] = ['free', 'month', 'quarter', 'year'];

	const filteredSubscriptions =
		data
			?.filter(({ code }) => visibleSubscriptions.includes(code))
			.sort(
				(a, b) => visibleSubscriptions.indexOf(a.code) - visibleSubscriptions.indexOf(b.code),
			) || [];

	const getBenefits = (code: SubscriptionCode) => {
		const benefits: Record<SubscriptionCode, SubscriptionInfoBenefit[]> = {
			free: freeBenefits,
			month: premiumBenefits,
			quarter: premiumBenefits,
			year: premiumBenefits,
			base: [],
			trial: [],
		};

		return benefits[code];
	};

	const getBadge = (code: SubscriptionCode, discount: number) => {
		const badges: Record<SubscriptionCode, string> = {
			free: '',
			month: t(Subscription.CARD_BADGE_BASIC),
			quarter: t(Subscription.CARD_BADGE_DISCOUNT, { count: discount }),
			year: t(Subscription.CARD_BADGE_DISCOUNT, { count: discount }),
			base: '',
			trial: '',
		};

		return badges[code];
	};

	const getColor = (code: SubscriptionCode) => {
		const colors: Record<SubscriptionCode, Pallete> = {
			free: 'purple-500',
			month: 'purple-700',
			quarter: 'yellow-800',
			year: 'green-750',
			base: 'white-900',
			trial: 'white-900',
		};

		return colors[code];
	};

	const getTitle = (code: SubscriptionCode) => {
		const titles: Record<SubscriptionCode, string> = {
			free: t(Subscription.CARD_TITLE_FREE),
			month: t(Subscription.CARD_TITLE_MONTH, { count: 1 }),
			quarter: t(Subscription.CARD_TITLE_MONTH, { count: 3 }),
			year: t(Subscription.CARD_TITLE_YEAR, { count: 1 }),
			base: '',
			trial: '',
		};

		return titles[code];
	};

	const getPricePerMonth = (code: SubscriptionCode, pricePerMonth: number) => {
		const titles: Record<SubscriptionCode, string> = {
			free: '',
			month: '',
			quarter: t(Subscription.CARD_PRICE_MONTH, { count: pricePerMonth }),
			year: t(Subscription.CARD_PRICE_MONTH, { count: pricePerMonth }),
			base: '',
			trial: '',
		};

		return titles[code];
	};

	const getSubtitle = (code: SubscriptionCode) => {
		const subtitles: Record<SubscriptionCode, string> = {
			free: hasTrialSubscriptions ? t(Subscription.CARD_SUBTITLE_FREE) : '',
			month: t(Subscription.CARD_SUBTITLE_MONTH),
			quarter: t(Subscription.CARD_SUBTITLE_QUARTER),
			year: t(Subscription.CARD_SUBTITLE_YEAR),
			base: '',
			trial: '',
		};

		return subtitles[code];
	};

	const getAction = (code: SubscriptionCode, id: number) => {
		const actions: Record<SubscriptionCode, ReactNode> = {
			free: hasTrialSubscriptions ? <TrialButton /> : null,
			month: <SubscribeButton subscriptionId={id} />,
			quarter: <SubscribeButton subscriptionId={id} />,
			year: <SubscribeButton subscriptionId={id} />,
			base: null,
			trial: null,
		};

		return actions[code];
	};

	const subscriptions: SubscriptionInfo[] = filteredSubscriptions.map(
		({ id, code, discount, finalPrice, pricePerMonth }) => ({
			id,
			code,
			finalPrice: t(Subscription.CARD_PRICE_ALL, { count: finalPrice }),
			fullPrice: finalPrice
				? t(Subscription.CARD_PRICE_ALL, { count: finalPrice / (1 - discount / 100) })
				: '',
			pricePerMonth: getPricePerMonth(code, pricePerMonth * (1 - discount / 100)),
			benefits: getBenefits(code),
			badge: getBadge(code, discount),
			color: getColor(code),
			title: getTitle(code),
			subtitle: getSubtitle(code),
			action: getAction(code, id),
		}),
	);

	return subscriptions;
};
