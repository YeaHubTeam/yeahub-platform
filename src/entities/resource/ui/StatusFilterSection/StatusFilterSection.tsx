import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { MarketplaceFilterStatus, MarketplaceFilterStatusItem } from '../../model/types';

interface StatusFilterSectionProps {
	selectedStatus?: MarketplaceFilterStatus;
	onChangeStatus: (status: MarketplaceFilterStatus) => void;
}

export const StatusFilterSection = ({
	onChangeStatus,
	selectedStatus,
}: StatusFilterSectionProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);

	const progressStatus: MarketplaceFilterStatusItem[] = [
		{ id: 'all', title: t(Marketplace.STATUS_ALL) },
	];

	const preparedData = progressStatus.map((item) => ({
		...item,
		active: item.id === selectedStatus,
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Marketplace.STATUS_TITLE)}
			onClick={onChangeStatus}
		/>
	);
};
