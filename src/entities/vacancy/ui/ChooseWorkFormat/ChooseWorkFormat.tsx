import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { VacancyWorkFormat } from '@/entities/vacancy';

import { WORKING_FORMAT } from '../../model/constants';

interface ChooseWorkFormatProps {
	selectedWorkFormats?: VacancyWorkFormat[];
	onChangeWorkFormat: (workFormats?: VacancyWorkFormat[]) => void;
}

export const ChooseWorkFormat = ({
	selectedWorkFormats,
	onChangeWorkFormat,
}: ChooseWorkFormatProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onWorkFormat = (id: number) => {
		const newValue = WORKING_FORMAT.find((item) => item.id === id)?.value;
		if (newValue) {
			const isDataExist = selectedWorkFormats?.some((workFormat) => newValue === workFormat);
			const updates = isDataExist
				? (selectedWorkFormats || []).filter((item) => newValue !== item)
				: [...(selectedWorkFormats || []), newValue];
			onChangeWorkFormat(updates.length === 0 ? undefined : updates);
		}
	};

	const preparedData = WORKING_FORMAT.map((item) => ({
		...item,
		title: t(item.title),
		active: selectedWorkFormats?.some((selectedItem) => item.value === selectedItem),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Vacancies.WORKING_FORMAT)}
			onClick={onWorkFormat}
		/>
	);
};
