import { Switch } from '@/shared/ui/Switch';

import { useToggleActiveFeatureFlagMutation } from '../api/toggleActiveFeatureFlagApi';

interface ToggleActiveFeatureFlagSwitchProps {
	featureFlagId: string;
	enabled: boolean;
}

export const ToggleActiveFeatureFlagSwitch = ({
	featureFlagId,
	enabled,
}: ToggleActiveFeatureFlagSwitchProps) => {
	const [toggleActiveFeatureFlag] = useToggleActiveFeatureFlagMutation();

	const onToggleActiveFeatureFlag = async () => {
		try {
			await toggleActiveFeatureFlag({ featureFlagId, enabled: !enabled }).unwrap();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return <Switch checked={enabled} onChange={onToggleActiveFeatureFlag} />;
};
