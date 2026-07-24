import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { getUpdatedSingleFilter } from '../../libs/updateFilterValue';
import { GRADE } from '../../model/constants';
import { ChoiseFilterProps } from '../../model/types';

export const ChooseGrade = ({ selectedFilter, onChangeFilter }: ChoiseFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onGrade = (id: number) => {
		const newValue = GRADE.find((el) => el.id === id)?.value || '';
		const updates = getUpdatedSingleFilter(newValue, selectedFilter);
		onChangeFilter(updates);
	};

	const preparedData = GRADE.map((item) => ({
		...item,
		active: selectedFilter?.some((selectedItem) => item.title === selectedItem),
	}));

	return <BaseFilterSection data={preparedData} title={t(Vacancies.GRADE)} onClick={onGrade} />;
};
