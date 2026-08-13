import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { VacancyEnglishLevel } from '@/entities/vacancy/model/types/vacancy';

import { ENGLISH_LEVEL } from '../../model/constants';

interface ChooseEnglishLevelProps {
	selectedEnglishLevels?: VacancyEnglishLevel[];
	onChangeEnglishLevel: (grade?: VacancyEnglishLevel[]) => void;
}

export const ChooseEnglishLevel = ({
	selectedEnglishLevels,
	onChangeEnglishLevel,
}: ChooseEnglishLevelProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onEnglishLevel = (id: number) => {
		const newValues = ENGLISH_LEVEL.find((englishLevel) => englishLevel.id === id)?.value || [];
		if (newValues) {
			const isDataExist = selectedEnglishLevels?.some((englishLevel) =>
				newValues.includes(englishLevel),
			);
			const updates = isDataExist
				? (selectedEnglishLevels || []).filter((englishLevel) => !newValues.includes(englishLevel))
				: [...(selectedEnglishLevels || []), ...newValues];
			onChangeEnglishLevel(updates.length === 0 ? undefined : updates);
		}
	};

	const preparedData = ENGLISH_LEVEL.map((item) => ({
		...item,
		active: selectedEnglishLevels?.some((selectedItem) =>
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
