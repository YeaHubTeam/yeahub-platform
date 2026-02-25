import { ReactNode } from 'react';

import { featureToggles } from '../../model/constants/featureToggles';
import { FeatureToggleType } from '../../model/types/featureToggle';

interface WithFeatureProps {
	featureId: FeatureToggleType;
	fallback?: ReactNode;
	children?: ReactNode;
}

export const WithFeature = ({ featureId, fallback = null, children }: WithFeatureProps) => {
	const isEnabled = featureToggles[featureId].enabled;

	if (!isEnabled) return <>{fallback}</>;

	return <>{children}</>;
};
