import { Response } from '@/shared/libs';

import { RoleName } from '@/entities/auth/@x/featureFlag';

export type FeatureFlagType =
	| 'nyBanner'
	| 'nyModal'
	| 'dashboard.analytic.user-rating'
	| 'changeLanguage'
	| 'common.app.change-theme'
	| 'dashboard.subscription.show-tariffs';

export interface FeatureFlag {
	id: FeatureFlagType;
	roles?: RoleName[];
	enabled: boolean;
	description: string;
}

export type FeatureFlags = Partial<Record<FeatureFlagType, FeatureFlag>>;

export type ClientType = 'WEB' | 'IOS' | 'ANDROID';

export type GetFeatureFlagsListResponse = Response<FeatureFlagApiItem[]>;

export type GetFeatureFlagByIdResponse = FeatureFlagApiItem;

export type Flag = string;

export interface FeatureFlagApiItem {
	id: string;
	flag: Flag;
	enabled: boolean;
	description: string;
	roles: RoleName[];
	clientType: ClientType;
	createdAt: string;
	updatedAt: string;
}

export interface GetFeatureFlagsListParamsRequest {
	page?: number;
	limit?: number;
	search?: string;
	enabled?: boolean;
	roleIds?: string;
	clientType?: ClientType;
}

export type CreateOrEditFeatureFlagFormValues = Omit<
	FeatureFlagApiItem,
	'roles' | 'createdAt' | 'updatedAt'
> & {
	roleIds: number[];
};
