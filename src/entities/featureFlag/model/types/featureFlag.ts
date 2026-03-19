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
