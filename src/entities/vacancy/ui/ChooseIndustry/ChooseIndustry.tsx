import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Flex } from '@/shared/ui/Flex';
import { ToggleShowAllButton } from '@/shared/ui/ToggleShowAllButton';

import { VacancyIndustry } from '@/entities/vacancy';

import { INDUSTRY, MAX_SHOW_LIMIT_INDUSTRY } from '../../model/constants';

interface ChooseIndustryProps {
	selectedIndustries?: VacancyIndustry[];
	onChangeIndustry: (grade?: VacancyIndustry[]) => void;
}

export const ChooseIndustry = ({ selectedIndustries, onChangeIndustry }: ChooseIndustryProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const [showAll, setShowAll] = useState(false);

	const onToggleShowAll = () => {
		setShowAll((prev) => !prev);
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

			<ToggleShowAllButton isToggled={showAll} onToggle={onToggleShowAll} />
		</Flex>
	);
};
