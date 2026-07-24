import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { getUpdatedSingleFilter } from '../../libs/updateFilterValue';
import { WORKING_FORMAT } from '../../model/constants';
import { ChoiseFilterProps } from '../../model/types';

export const ChooseWorkFormat = ({ selectedFilter, onChangeFilter }: ChoiseFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onWorkFormat = (id: number) => {
		const newValue = WORKING_FORMAT.find((el) => el.id === id)?.value || '';
		const updates = getUpdatedSingleFilter(newValue, selectedFilter);
		onChangeFilter(updates);
	};

	const preparedData = WORKING_FORMAT.map((item) => ({
		...item,
		title: t(item.title),
		active: selectedFilter?.some((selectedItem) => item.value === selectedItem),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Vacancies.WORKING_FORMAT)}
			onClick={onWorkFormat}
		/>
	);
};
