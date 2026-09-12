import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { VacancyGrade } from '@/entities/vacancy';

import { GRADE } from '../../model/constants';

interface ChooseGradeProps {
	selectedGrades?: VacancyGrade[];
	onChangeGrade: (grade?: VacancyGrade[]) => void;
}

export const ChooseGrade = ({ selectedGrades, onChangeGrade }: ChooseGradeProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onGrade = (id: number) => {
		const newValue = GRADE.find((grade) => grade.id === id)?.value;
		if (newValue) {
			const isDataExist = selectedGrades?.some((grade) => newValue === grade);
			const updates = isDataExist
				? (selectedGrades || []).filter((grade) => newValue !== grade)
				: [...(selectedGrades || []), newValue];
			onChangeGrade(updates.length === 0 ? undefined : updates);
		}
	};

	const preparedData = GRADE.map((grade) => ({
		...grade,
		active: selectedGrades?.some((selectedGrade) => grade.title === selectedGrade),
	}));

	return <BaseFilterSection data={preparedData} title={t(Vacancies.GRADE)} onClick={onGrade} />;
};
