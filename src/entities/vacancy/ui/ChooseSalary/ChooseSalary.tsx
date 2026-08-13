import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { VacancySalaryBucket } from '@/entities/vacancy';

import { SALARY_BUCKET } from '../../model/constants';

interface ChooseSalaryProps {
	selectedSalaries?: VacancySalaryBucket[];
	onChangeSalary: (salaryBucket?: VacancySalaryBucket[]) => void;
}

export const ChooseSalary = ({ selectedSalaries, onChangeSalary }: ChooseSalaryProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onSalaryBucket = (id: number) => {
		const newValue = SALARY_BUCKET.find((salaryBucket) => salaryBucket.id === id)?.value;
		if (newValue) {
			if (newValue) {
				const isDataExist = selectedSalaries?.some(
					(selectedSalaryBucket) => newValue === selectedSalaryBucket,
				);
				const updates = isDataExist
					? (selectedSalaries || []).filter(
							(selectedSalaryBucket) => newValue !== selectedSalaryBucket,
						)
					: [...(selectedSalaries || []), newValue];
				onChangeSalary(updates.length === 0 ? undefined : updates);
			}
		}
	};

	const preparedData = SALARY_BUCKET.map((salaryBucket) => ({
		...salaryBucket,
		active: selectedSalaries?.some(
			(selectedSalaryBucket) => salaryBucket.value === selectedSalaryBucket,
		),
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(Vacancies.SALARY)} onClick={onSalaryBucket} />
	);
};
