import { Flex } from '@/shared/ui/Flex';

import { VacancyCard } from '@/entities/vacancy';
import { Vacancy } from '@/entities/vacancy';

interface VacanciesListProps {
	vacancies: Vacancy[];
}

export const VacanciesList = ({ vacancies }: VacanciesListProps) => {
	return (
		<Flex direction="column" gap="20">
			{vacancies.map((vacancy) => {
				return <VacancyCard vacancy={vacancy} key={vacancy.id} />;
			})}
		</Flex>
	);
};
