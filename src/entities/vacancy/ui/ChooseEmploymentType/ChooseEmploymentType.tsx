import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { getUpdatedSingleFilter } from '../../libs/updateFilterValue';
import { EMPLOYMENT_TYPE } from '../../model/constants';
import { ChoiseFilterProps } from '../../model/types';

export const ChooseEmploymentType = ({ selectedFilter, onChangeFilter }: ChoiseFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onCompanyType = (id: number) => {
		const newValue = EMPLOYMENT_TYPE.find((el) => el.id === id)?.title || '';
		const updates = getUpdatedSingleFilter(newValue, selectedFilter);
		onChangeFilter(updates);
	};

	const preparedData = EMPLOYMENT_TYPE.map((item) => ({
		...item,
		active: selectedFilter?.some((selectedItem) => item.title === selectedItem),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Vacancies.EMPLOYMENT_TYPE)}
			onClick={onCompanyType}
		/>
	);
};
