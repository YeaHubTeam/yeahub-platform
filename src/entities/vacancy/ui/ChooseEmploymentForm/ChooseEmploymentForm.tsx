import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { VacancyEmploymentForm } from '@/entities/vacancy';

import { EMPLOYMENT_FORM } from '../../model/constants';

interface ChooseEmploymentFormProps {
	selectedEmploymentForms?: VacancyEmploymentForm[];
	onChangeEmploymentForm: (employmentForm?: VacancyEmploymentForm[]) => void;
}

export const ChooseEmploymentForm = ({
	selectedEmploymentForms,
	onChangeEmploymentForm,
}: ChooseEmploymentFormProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onEmploymentForm = (id: number) => {
		const newValue = EMPLOYMENT_FORM.find((employmentForm) => employmentForm.id === id)?.value;
		if (newValue) {
			const isDataExist = selectedEmploymentForms?.some(
				(employmentForm) => newValue === employmentForm,
			);
			const updates = isDataExist
				? (selectedEmploymentForms || []).filter((item) => newValue !== item)
				: [...(selectedEmploymentForms || []), newValue];
			onChangeEmploymentForm(updates.length === 0 ? undefined : updates);
		}
	};

	const preparedData = EMPLOYMENT_FORM.map((employmentForm) => ({
		...employmentForm,
		active: selectedEmploymentForms?.some(
			(selectedEmploymentForm) => employmentForm.title === selectedEmploymentForm,
		),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Vacancies.EMPLOYMENT_TYPE)}
			onClick={onEmploymentForm}
		/>
	);
};
