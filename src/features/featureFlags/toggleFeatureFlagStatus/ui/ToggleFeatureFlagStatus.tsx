import { ChangeEvent } from 'react';

import { Switch } from '@/shared/ui/Switch';

import { useUpdateFeatureFlagStatusMutation } from '@/entities/featureFlag';

interface ToggleFeatureFlagStatusProps {
	featureFlagId: string;
	enabled: boolean;
}

export const ToggleFeatureFlagStatus = ({
	featureFlagId,
	enabled,
}: ToggleFeatureFlagStatusProps) => {
	const [updateFeatureFlag, { isLoading }] = useUpdateFeatureFlagStatusMutation();

	const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
		updateFeatureFlag({ id: featureFlagId, enabled: event.target.checked });
	};

	return <Switch checked={enabled} onChange={handleToggle} disabled={isLoading} />;
};
