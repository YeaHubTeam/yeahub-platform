import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

const rate = [
	{ id: 1, title: '1' },
	{ id: 2, title: '2' },
	{ id: 3, title: '3' },
	{ id: 4, title: '4' },
	{ id: 5, title: '5' },
];

interface RateFilterSectionProps {
	selectedRate?: number[];
	onChangeRate: (rate: number[]) => void;
}

export const RateFilterSection = ({ onChangeRate, selectedRate }: RateFilterSectionProps) => {
	const { t } = useI18nHelpers(i18Namespace.questions);
	const onClick = (rateId: number) => {
		const isDataExist = selectedRate?.some((item) => item === rateId);
		const updates = isDataExist
			? (selectedRate || []).filter((item) => item !== rateId)
			: [...(selectedRate || []), rateId];
		onChangeRate(updates);
	};

	const preparedData = rate.map((item) => ({
		...item,
		active: selectedRate?.some((selectedItem) => item.id === selectedItem),
	}));

	return <BaseFilterSection data={preparedData} title={t('rate.title')} onClick={onClick} />;
};
