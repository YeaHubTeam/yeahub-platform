import { ReactNode } from 'react';

import { Pallete } from '@/shared/libs';

import { SubscriptionCode } from '@/entities/subscription';

import { SubscriptionInfoBenefit } from '@/pages/profile/settings/lib/constants/benefitsConstants';

export interface SubscriptionInfo {
	id: number;
	code: SubscriptionCode;
	finalPrice: string;
	fullPrice: string;
	pricePerMonth: string;
	benefits: SubscriptionInfoBenefit[];
	badge: string;
	color: Pallete;
	title: string;
	subtitle: string;
	action: ReactNode;
}
