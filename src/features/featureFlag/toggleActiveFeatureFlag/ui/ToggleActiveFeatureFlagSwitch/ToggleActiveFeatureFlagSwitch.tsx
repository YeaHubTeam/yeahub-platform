import { Switch } from '@/shared/ui/Switch';

import { useToggleActiveFeatureFlagMutation } from '../../api/toggleActiveFeatureFlagApi';

interface ToggleActiveFeatureFlagSwitchProps {
	id: string;
	enabled: boolean;
}

export const ToggleActiveFeatureFlagSwitch = ({
	id,
	enabled,
}: ToggleActiveFeatureFlagSwitchProps) => {
	const [toggleActiveFeatureFlag, { isLoading }] = useToggleActiveFeatureFlagMutation();

	const onToggleActiveFeatureFlag = () => {
		toggleActiveFeatureFlag({ id, enabled: !enabled });
	};

	return <Switch checked={enabled} onChange={onToggleActiveFeatureFlag} disabled={isLoading} />;
};
