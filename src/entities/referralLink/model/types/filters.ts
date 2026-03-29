import { SortOrder } from '@/shared/libs';

export interface ReferralLinksFilterParams {
	title?: string;
	page?: number;
	isMy?: boolean;
	keyword?: string;
	ownerId?: string;
	orderBy?: ReferralLinksFilterOrderBy;
	order?: SortOrder;
}

export type ReferralLinksFilterOrderBy = 'linkedCount' | 'amountSum' | 'createdAt' | 'refCode';
