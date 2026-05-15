import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { Switch } from '@/shared/ui/Switch';

import { UserRolesListField } from '@/entities/user';

import { FeatureFlagFiltersParams } from '../..';

interface FeatureFlagFiltersProps {
	filters: FeatureFlagFiltersParams;
	onChangeRoles: (roles?: FeatureFlagFiltersParams['selectedRoles']) => void;
	onChangeIsEnabled: (enabled: FeatureFlagFiltersParams['enabled']) => void;
}

export const FeatureFlagFilters = ({
	filters,
	onChangeRoles,
	onChangeIsEnabled,
}: FeatureFlagFiltersProps) => {
	const { enabled } = filters;

	const { t } = useTranslation(i18Namespace.featureFlags);

	return (
		<>
			<Switch
				checked={enabled ?? false}
				onChange={(e) => {
					onChangeIsEnabled(e.target.checked);
				}}
				label={t(FeatureFlags.TABLE_ENABLED)}
			/>
			<UserRolesListField
				title={t(FeatureFlags.FILTER_ROLE)}
				selectedRoles={filters.selectedRoles}
				onChangeRoles={onChangeRoles}
			/>
		</>
	);
};
