import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import type { VacancySalary } from '../../model/types/vacancy';

interface VacancyCardSalaryProps {
	salary: VacancySalary;
}

export const VacancyCardSalary = ({ salary }: VacancyCardSalaryProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const currency = salary.currency ?? '';

	const from = salary.from ? `${t(Vacancies.LIST_PAGE_SALARY_FROM)} ${salary.from}` : '';
	const to = salary.to ? `${t(Vacancies.LIST_PAGE_SALARY_TO)} ${salary.to}` : '';

	return (
		<Flex maxWidth justify="end">
			<Text variant="body6">{`${from} ${to} ${currency}`.trim()}</Text>
		</Flex>
	);
};
