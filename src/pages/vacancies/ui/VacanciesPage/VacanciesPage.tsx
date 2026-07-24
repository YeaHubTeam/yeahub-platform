import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { DEFAULT_SPECIALIZATION_ID, Specialization } from '@/entities/specialization';
import { useGetVacanciesQuery } from '@/entities/vacancy';

import { VacanciesList } from '@/widgets/Vacancy';

import { useVacanciesFilter } from '../../model/hooks/useVacanciesFilter';
import { VacanciesFilterPanel } from '../../ui/VacanciesFilterPanel/VacanciesFilterPanel';
import { VacanciesPageHeader } from '../../ui/VacanciesPageHeader/VacanciesPageHeader';
import { VacanciesPagePagination } from '../../ui/VacanciesPagePagination/VacanciesPagePagination';

import styles from './VacanciesPage.module.css';

export const VacanciesPage = () => {
	const specializationId = useAppSelector(getSpecializationId) || DEFAULT_SPECIALIZATION_ID;

	const { filter, requestParams, selectedSpecialization, handlers } = useVacanciesFilter({
		id: specializationId,
	} as Specialization);

	const { data: vacancies } = useGetVacanciesQuery(requestParams);

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<VacanciesPageHeader
					filter={filter}
					selectedSpecialization={selectedSpecialization}
					handlers={handlers}
				/>
				<VacanciesList vacancies={vacancies?.data ?? []} />
				<VacanciesPagePagination
					total={vacancies?.total ?? 0}
					limit={vacancies?.limit ?? 0}
					currentPage={requestParams.page ?? 1}
					onChangePage={handlers.onChangePage}
				/>
			</Card>
			<Card className={styles.filters}>
				<VacanciesFilterPanel
					filter={filter}
					selectedSpecialization={selectedSpecialization}
					handlers={handlers}
				/>
			</Card>
		</Flex>
	);
};
