import { GetVacanciesListParamsRequest } from './vacancy';

export type VacanciesFilterParams = Omit<
	GetVacanciesListParamsRequest,
	'source' | 'specializationId'
>;
