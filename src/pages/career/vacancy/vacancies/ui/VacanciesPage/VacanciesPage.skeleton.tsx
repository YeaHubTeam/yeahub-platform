import { VacanciesFiltersSkeleton } from '@/features/vacancy/filterVacancies';

import { ListLayoutPageSkeleton } from '@/widgets/ListLayoutPage';
import { VacanciesListSkeleton } from '@/widgets/vacancy/VacanciesList';

export const VacanciesPageSkeleton = () => {
	return (
		<ListLayoutPageSkeleton
			widthText={124}
			filters={<VacanciesFiltersSkeleton />}
			list={<VacanciesListSkeleton />}
		/>
	);
};
