import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface TestQuestionRateFilterProps {
	selectedRate?: number[];
	onChangeRate: (rate?: number[]) => void;
}

const rateOptions = [1, 2, 3, 4, 5];

export const TestQuestionRateFilter = ({
	selectedRate,
	onChangeRate,
}: TestQuestionRateFilterProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const onClick = (value: number) => {
		const current = selectedRate || [];
		const next = current.includes(value)
			? current.filter((item) => item !== value)
			: [...current, value];

		onChangeRate(next.length ? next : undefined);
	};

	const data = rateOptions.map((value) => ({
		id: value,
		title: String(value),
		active: selectedRate?.includes(value),
	}));

	return <BaseFilterSection data={data} title={t(Questions.RATE_TITLE)} onClick={onClick} />;
};
