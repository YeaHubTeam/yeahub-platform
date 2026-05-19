import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { ClientType, clientTypes } from '@/entities/featureFlag';

interface ClientTypeFilterProps {
	selectedClientType?: string;
	onChangeClientType: (clientType?: ClientType) => void;
}

export const ClientTypeFilter = ({
	selectedClientType,
	onChangeClientType,
}: ClientTypeFilterProps) => {
	const { t } = useTranslation(i18Namespace.featureFlags);

	const onClick = (clientType: ClientType) => {
		if (selectedClientType === clientType) {
			onChangeClientType(undefined);
			return;
		}
		onChangeClientType(clientType);
	};

	const preparedData = clientTypes.map((item) => ({
		id: item,
		title: item,
		active: selectedClientType === item,
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(FeatureFlags.CLIENT_TYPE)} onClick={onClick} />
	);
};
