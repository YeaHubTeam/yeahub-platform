import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { ClientType } from '@/entities/featureFlag';

interface ClientTypeFilterProps {
	selectedClientType?: string;
	onChangeClientType: (clientType?: ClientType) => void;
}

type ClientTypeRecord = Record<number, ClientType>;

const data: ClientTypeRecord = { 1: 'WEB', 2: 'IOS', 3: 'ANDROID' };

export const ClientTypeFilter = ({
	selectedClientType,
	onChangeClientType,
}: ClientTypeFilterProps) => {
	const { t } = useTranslation(i18Namespace.featureFlags);

	const onClick = (clientTypeId: keyof ClientTypeRecord) => {
		if (selectedClientType && data[clientTypeId] === selectedClientType) {
			onChangeClientType(undefined);
			return;
		}
		onChangeClientType(data[clientTypeId]);
	};

	const preparedData = Object.entries(data).map((item) => ({
		id: Number(item[0]),
		title: item[1],
		active: selectedClientType === item[1],
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(FeatureFlags.CLIENT_TYPE)} onClick={onClick} />
	);
};
