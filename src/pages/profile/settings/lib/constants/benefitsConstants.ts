import { Subscription } from '@/shared/config';

export interface SubscriptionInfoBenefit {
	title: string;
	isActive: boolean;
}

export const freeBenefits: SubscriptionInfoBenefit[] = [
	{
		title: Subscription.CARD_BENEFITS_FIRST,
		isActive: true,
	},
	{
		title: Subscription.CARD_BENEFITS_FOURTH_FREE,
		isActive: true,
	},
	{
		title: Subscription.CARD_BENEFITS_SECOND,
		isActive: false,
	},
	{
		title: Subscription.CARD_BENEFITS_THIRD,
		isActive: false,
	},
];

export const premiumBenefits: SubscriptionInfoBenefit[] = [
	{
		title: Subscription.CARD_BENEFITS_FIRST,
		isActive: true,
	},
	{
		title: Subscription.CARD_BENEFITS_SECOND,
		isActive: true,
	},
	{
		title: Subscription.CARD_BENEFITS_THIRD,
		isActive: true,
	},
	{
		title: Subscription.CARD_BENEFITS_FOURTH_PAID,
		isActive: true,
	},
];
