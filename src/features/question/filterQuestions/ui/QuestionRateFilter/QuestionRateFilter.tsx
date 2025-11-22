import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

const rate = [
	{ id: 1, title: '1' },
	{ id: 2, title: '2' },
	{ id: 3, title: '3' },
	{ id: 4, title: '4' },
	{ id: 5, title: '5' },
];

interface QuestionRateFilterProps {
	selectedRate?: number[];
	onChangeRate: (rate?: number[]) => void;
}

export const QuestionRateFilter = ({ onChangeRate, selectedRate }: QuestionRateFilterProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const onClick = (rateId: number) => {
		const isDataExist = selectedRate?.some((item) => item === rateId);
		const updates = isDataExist
			? (selectedRate || []).filter((item) => item !== rateId)
			: [...(selectedRate || []), rateId];
		onChangeRate(updates.length ? updates : undefined);
	};

	const preparedData = rate.map((item) => ({
		...item,
		active: selectedRate?.some((selectedItem) => item.id === selectedItem),
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(Questions.RATE_TITLE)} onClick={onClick} />
	);
};
