import { RoleName } from '@/entities/auth/@x/featureFlag';

export type FeatureFlagType =
	| 'nyBanner'
	| 'nyModal'
	| 'usersRating'
	| 'changeLanguage'
	| 'changeTheme';

export interface FeatureFlag {
	id: FeatureFlagType;
	roles?: RoleName[];
	enabled: boolean;
	description: string;
}

export type FeatureFlags = Record<FeatureFlagType, FeatureFlag>;

export type ClientType = 'WEB' | 'MOBILE' | 'DESKTOP';

export interface FeatureFlagApiItem {
	id: string;
	flag: string;
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
	roleIds?: RoleName[];
	clientType?: ClientType;
}

export interface GetFeatureFlagsListResponse {
	total: number;
	page: number;
	limit: number;
	data: FeatureFlagApiItem[];
}
