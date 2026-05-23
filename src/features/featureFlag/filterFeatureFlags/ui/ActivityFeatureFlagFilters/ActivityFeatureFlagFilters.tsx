import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface ActivityFeatureFlagFiltersProps {
	enabled?: boolean;
	onChangeIsEnabled: (id?: boolean) => void;
}

const EnabledButtonId = 'EnabledButton';
const DisabledButtonId = 'DisabledButton';

export const ActivityFeatureFlagFilters = ({
	enabled,
	onChangeIsEnabled,
}: ActivityFeatureFlagFiltersProps) => {
	const hasFilter = typeof enabled === 'boolean';
	const { t } = useTranslation(i18Namespace.featureFlags);
	const data = [
		{
			id: EnabledButtonId,
			title: t(FeatureFlags.FILTER_ENABLED_ON),
			active: enabled,
		},
		{
			id: DisabledButtonId,
			title: t(FeatureFlags.FILTER_ENABLED_OFF),
			active: !enabled && hasFilter,
		},
	];

	const onClick = (id: string) => {
		if (
			!hasFilter ||
			(hasFilter && ((EnabledButtonId === id && !enabled) || (DisabledButtonId === id && enabled)))
		) {
			onChangeIsEnabled(id === EnabledButtonId);
		} else {
			onChangeIsEnabled(undefined);
		}
	};

	return <BaseFilterSection data={data} title={t(FeatureFlags.FILTER_ENABLED)} onClick={onClick} />;
};
