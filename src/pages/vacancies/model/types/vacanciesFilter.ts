import { UseVacanciesFilterReturn } from '../hooks/useVacanciesFilter';

export type VacanciesFilterProps = Pick<
	UseVacanciesFilterReturn,
	'filter' | 'selectedSpecialization' | 'handlers'
>;
