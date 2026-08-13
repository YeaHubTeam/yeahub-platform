import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Translation, Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { VacancyIndustry } from '@/entities/vacancy';

import { INDUSTRY, MAX_SHOW_LIMIT_INDUSTRY } from '../../model/constants';

interface ChooseIndustryProps {
	selectedIndustries?: VacancyIndustry[];
	onChangeIndustry: (grade?: VacancyIndustry[]) => void;
}

export const ChooseIndustry = ({ selectedIndustries, onChangeIndustry }: ChooseIndustryProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	const { t: tCommon } = useTranslation(i18Namespace.translation);

	const [showAll, setShowAll] = useState(false);

	const onToggleShowAll = () => {
		setShowAll(!showAll);
	};

	const onIndustry = (id: number) => {
		const newValue = INDUSTRY.find((industry) => industry.id === id)?.value;
		if (newValue) {
			const isDataExist = selectedIndustries?.some((industry) => newValue === industry);
			const updates = isDataExist
				? (selectedIndustries || []).filter((industry) => newValue !== industry)
				: [...(selectedIndustries || []), newValue];
			onChangeIndustry(updates.length === 0 ? undefined : updates);
		}
	};

	const preparedData = INDUSTRY.map((item) => ({
		...item,
		active: selectedIndustries?.some((selectedItem) => item.title === selectedItem),
	})).slice(0, showAll ? INDUSTRY.length : MAX_SHOW_LIMIT_INDUSTRY);

	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSection data={preparedData} title={t(Vacancies.INDUSTRY)} onClick={onIndustry} />

			<Button variant="link" onClick={onToggleShowAll}>
				{!showAll ? tCommon(Translation.SHOW_ALL) : tCommon(Translation.HIDE)}
			</Button>
		</Flex>
	);
};
