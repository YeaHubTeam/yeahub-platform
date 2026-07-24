import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { getUpdatedSingleFilter } from '../../libs/updateFilterValue';
import { SALARY_BUCKET } from '../../model/constants';
import { ChoiseFilterProps } from '../../model/types';

export const ChooseSalary = ({ selectedFilter, onChangeFilter }: ChoiseFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onSalaryBucket = (id: number) => {
		const newValue = SALARY_BUCKET.find((el) => el.id === id)?.value || '';
		const updates = getUpdatedSingleFilter(newValue, selectedFilter);
		onChangeFilter(updates);
	};

	const preparedData = SALARY_BUCKET.map((item) => ({
		...item,
		active: selectedFilter?.some((selectedItem) => item.value === selectedItem),
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(Vacancies.SALARY)} onClick={onSalaryBucket} />
	);
};
