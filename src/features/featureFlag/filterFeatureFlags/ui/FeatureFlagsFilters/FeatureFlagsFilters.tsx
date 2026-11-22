import { useTranslation } from 'react-i18next';

import { FeatureFlagsTranslation, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Flex } from '@/shared/ui/Flex';

import { clientTypes, type ClientType } from '@/entities/featureFlag';
import { UserRolesListField } from '@/entities/user';

import type { FeatureFlagsFilterParams } from '../../model/types/filters';

type EnabledOption = 'on' | 'off';

interface FeatureFlagsFilterProps {
	filters: FeatureFlagsFilterParams;
	onChangeRoleIds: (roleIds?: number[]) => void;
	onChangeClientType: (clientType: ClientType) => void;
	onChangeEnabled: (enabled?: boolean) => void;
}

export const FeatureFlagsFilters = ({
	filters,
	onChangeRoleIds,
	onChangeClientType,
	onChangeEnabled,
}: FeatureFlagsFilterProps) => {
	const [t] = useTranslation(i18Namespace.featureFlags);
	const clientTypeData = clientTypes.map((type) => ({
		id: type,
		title: type,
		active: filters.clientType === type,
	}));

	const enabledData: { id: EnabledOption; title: string; active: boolean }[] = [
		{
			id: 'on',
			title: t(FeatureFlagsTranslation.FILTER_ENABLED_ON),
			active: filters.enabled === true,
		},
		{
			id: 'off',
			title: t(FeatureFlagsTranslation.FILTER_ENABLED_OFF),
			active: filters.enabled === false,
		},
	];

	const onToggleEnabled = (id: EnabledOption) => {
		const value = id === 'on';
		onChangeEnabled(filters.enabled === value ? undefined : value);
	};

	return (
		<Flex direction="column" gap="24">
			<UserRolesListField
				title={t(FeatureFlagsTranslation.FILTER_ROLES)}
				selectedRoles={filters.roleIds}
				onChangeRoles={onChangeRoleIds}
			/>
			<BaseFilterSection
				title={t(FeatureFlagsTranslation.FILTER_CLIENT_TYPE)}
				data={clientTypeData}
				onClick={onChangeClientType}
			/>
			<BaseFilterSection
				title={t(FeatureFlagsTranslation.FILTER_ENABLED)}
				data={enabledData}
				onClick={onToggleEnabled}
			/>
		</Flex>
	);
};
