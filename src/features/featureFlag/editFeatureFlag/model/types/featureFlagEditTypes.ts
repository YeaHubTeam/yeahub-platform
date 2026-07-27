import { CreateOrEditFeatureFlagFormValues, FeatureFlagApiItem } from '@/entities/featureFlag';

export type EditFeatureFlagBodyRequest = CreateOrEditFeatureFlagFormValues;
export type EditFeatureFlagResponse = FeatureFlagApiItem;

export type EditFeatureFlagError =
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'feature-flag.feature-flag.already_exists'
	| 'feature-flag.feature-flag.not_found';
