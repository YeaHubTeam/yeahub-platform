import { ReactNode } from 'react';

import { useAppSelector } from '@/shared/libs';

import { getUserRoles } from '@/entities/profile/@x/featureFlag';

import { featureFlags } from '../../model/constants/featureFlags';
import { FeatureFlagType } from '../../model/types/featureFlag';

interface WithFeatureProps {
	featureId: FeatureFlagType;

	fallback?: ReactNode;
	children?: ReactNode;
}

export const WithFeature = ({ featureId, fallback = null, children }: WithFeatureProps) => {
	const userRoles = useAppSelector(getUserRoles);
	const hasRole = featureFlags[featureId].roles
		? userRoles.some((role) => featureFlags[featureId].roles?.includes(role))
		: true;
	const isEnabled = featureFlags[featureId].enabled;

	if (!isEnabled || !hasRole) return <>{fallback}</>;

	return <>{children}</>;
};
