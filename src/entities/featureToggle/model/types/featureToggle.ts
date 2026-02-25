export type FeatureToggleType = 'nyBanner' | 'nyModal' | 'usersRating';

export interface FeatureToggle {
	id: FeatureToggleType;
	enabled: boolean;
	description: string;
}

export type FeatureToggles = Record<FeatureToggleType, FeatureToggle>;
