import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { VacancyEnglishLevel } from '@/entities/vacancy/model/types/vacancy';

import { getUpdatedMultipleFilter } from '../../libs/updateFilterValue';
import { ENGLISH_LEVEL } from '../../model/constants';
import { ChoiseFilterProps } from '../../model/types';

export const ChooseEnglishLevel = ({ selectedFilter, onChangeFilter }: ChoiseFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onEnglishLevel = (id: number) => {
		const newValue = ENGLISH_LEVEL.find((el) => el.id === id)?.value || [];
		const updates = getUpdatedMultipleFilter(newValue, selectedFilter);
		onChangeFilter(updates);
	};

	const preparedData = ENGLISH_LEVEL.map((item) => ({
		...item,
		active: selectedFilter?.some((selectedItem) =>
			item.value.includes(selectedItem as VacancyEnglishLevel),
		),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Vacancies.ENGLISH_LEVEL)}
			onClick={onEnglishLevel}
		/>
	);
};
