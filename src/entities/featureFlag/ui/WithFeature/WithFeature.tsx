import { ReactNode } from 'react';

import { useAppSelector } from '@/shared/libs';

import { getUserRoles } from '@/entities/profile/@x/featureFlag';

import { getFeatureFlag } from '../../model/selectors/featureFlagSelectors';
import { FeatureFlagType } from '../../model/types/featureFlag';

interface WithFeatureProps {
	featureId: FeatureFlagType;

	fallback?: ReactNode;
	children?: ReactNode;
}

export const WithFeature = ({ featureId, fallback = null, children }: WithFeatureProps) => {
	const userRoles = useAppSelector(getUserRoles);
	const featureFlag = useAppSelector(getFeatureFlag(featureId));

	if (!featureFlag) return <>{fallback}</>;

	const hasRole = featureFlag.roles?.length
		? userRoles.some((role) => featureFlag.roles.includes(role))
		: true;
	const isEnabled = featureFlag.enabled;

	if (!hasRole || !isEnabled) return <>{fallback}</>;

	return <>{children}</>;
};
