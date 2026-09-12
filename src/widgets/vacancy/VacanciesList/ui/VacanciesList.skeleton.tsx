import { Flex } from '@/shared/ui/Flex';

import { VacancyCardSkeleton } from '@/entities/vacancy';
import { MAX_SHOW_LIMIT_VACANCIES } from '@/entities/vacancy';

export const VacanciesListSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			{[...Array(MAX_SHOW_LIMIT_VACANCIES)].map((_, i) => (
				<VacancyCardSkeleton key={i} />
			))}
		</Flex>
	);
};
