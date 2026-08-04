import { API_VERSION } from '@/shared/config';
import { Vacancies } from '@/shared/config';

import { VacancyTag } from '../types/vacancy';

export const vacancyApiUrls = {
	getVacanciesList: `${API_VERSION.V1}/vacancies`,
	getVacancyById: `${API_VERSION.V1}/vacancies/:vacancyId`,
};

export const MAX_SHOW_LIMIT_VACANCIES = 10;
export const MAX_SHOW_LIMIT_SKILLS = 4;
export const MAX_SHOW_LIMIT_KEYWORDS = 5;

export const tagList: VacancyTag[] = [
	{
		id: 'area',
		icon: 'compass',
		category: Vacancies.TAGS_AREA,
	},
	{
		id: 'grade',
		icon: 'bar',
		category: Vacancies.TAGS_GRADE,
	},
	{
		id: 'employmentForm',
		icon: 'clock',
		category: Vacancies.TAGS_EMPLOYMENT,
	},
	{
		id: 'industry',
		icon: 'globe',
		category: Vacancies.TAGS_INDUSTRY,
	},
	{
		id: 'companyType',
		icon: 'packageBox',
		category: Vacancies.TAGS_COMPANY_TYPE,
	},
];
