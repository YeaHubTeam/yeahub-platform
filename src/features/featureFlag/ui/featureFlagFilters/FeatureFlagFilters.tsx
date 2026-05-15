import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { Switch } from '@/shared/ui/Switch';

import { GetFeatureFlagsListParamsRequest } from '@/entities/featureFlag';

interface FeatureFlagFiltersProps {
	filters: GetFeatureFlagsListParamsRequest;
	onChangeIsEnabled: (enabled: GetFeatureFlagsListParamsRequest['enabled']) => void;
}

export const FeatureFlagFilters = ({ filters, onChangeIsEnabled }: FeatureFlagFiltersProps) => {
	const { enabled } = filters;

	const { t } = useTranslation(i18Namespace.featureFlags);

	return (
		<div>
			<Switch
				checked={enabled ?? false}
				onChange={(e) => {
					onChangeIsEnabled(e.target.checked);
				}}
				label={t(FeatureFlags.TABLE_ENABLED)}
			/>
		</div>
	);
};
