import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { getUpdatedSingleFilter } from '../../libs/updateFilterValue';
import { COMPANY_TYPE } from '../../model/constants';
import { ChoiseFilterProps } from '../../model/types';

export const ChooseCompanyType = ({ selectedFilter, onChangeFilter }: ChoiseFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onCompanyType = (id: number) => {
		const newValue = COMPANY_TYPE.find((el) => el.id === id)?.value || '';
		const updates = getUpdatedSingleFilter(newValue, selectedFilter);
		onChangeFilter(updates);
	};

	const preparedData = COMPANY_TYPE.map((item) => ({
		...item,
		active: selectedFilter?.some((selectedItem) => item.title === selectedItem),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Vacancies.COMPANY_TYPE)}
			onClick={onCompanyType}
		/>
	);
};
