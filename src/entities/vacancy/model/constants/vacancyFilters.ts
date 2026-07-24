import { Vacancies } from '@/shared/config';

import {
	VacancyCompanyType,
	VacancyEmploymentForm,
	VacancyEnglishLevel,
	VacancyGrade,
	VacancyIndustry,
	VacancyWorkFormat,
} from '@/entities/vacancy/model/types/vacancy';

type FilterItem<T> = {
	id: number;
	title: string;
	value?: T;
};

type MultiFilterItem<T> = {
	id: number;
	title: string;
	value: T[];
};

export const MAX_SHOW_LIMIT_INDUSTRY = 4;
export const WORKING_FORMAT: FilterItem<VacancyWorkFormat>[] = [
	{ id: 1, title: Vacancies.WORKING_FORMAT_OFFICE, value: 'Office' },
	{ id: 2, title: Vacancies.WORKING_FORMAT_REMOTE, value: 'Remote' },
	{ id: 3, title: Vacancies.WORKING_FORMAT_HYBRID, value: 'Hybrid' },
];
export const INDUSTRY: FilterItem<VacancyIndustry>[] = [
	{ id: 1, title: 'AI', value: 'AI' },
	{ id: 2, title: 'SaaS', value: 'SaaS' },
	{ id: 3, title: 'FinTech', value: 'FinTech' },
	{ id: 4, title: 'GameDev', value: 'GameDev' },
	{ id: 5, title: 'Ecommerce', value: 'Ecommerce' },
	{ id: 6, title: 'Robotics', value: 'Robotics' },
	{ id: 7, title: 'IGamming', value: 'IGamming' },
	{ id: 8, title: 'Retail', value: 'Retail' },
	{ id: 9, title: 'MedTech', value: 'MedTech' },
	{ id: 10, title: 'EdTech', value: 'EdTech' },
	{ id: 11, title: 'HRTech', value: 'HRTech' },
	{ id: 12, title: 'Cybersecurity', value: 'Cybersecurity' },
	{ id: 13, title: 'Logistics', value: 'Logistics' },
	{ id: 14, title: 'Travel', value: 'Travel' },
	{ id: 15, title: 'Telecom', value: 'Telecom' },
	{ id: 16, title: 'Other', value: 'Other' },
];

export const GRADE: FilterItem<VacancyGrade>[] = [
	{ id: 1, title: 'Trainee', value: 'Trainee' },
	{ id: 2, title: 'Junior', value: 'Junior' },
	{ id: 3, title: 'Middle', value: 'Middle' },
	{ id: 4, title: 'Senior', value: 'Senior' },
	{ id: 5, title: 'Lead', value: 'Lead' },
	{ id: 6, title: 'Head', value: 'Head' },
];

export const COMPANY_TYPE: FilterItem<VacancyCompanyType>[] = [
	{ id: 1, title: 'Product', value: 'Product' },
	{ id: 2, title: 'Outsource', value: 'Outsource' },
	{ id: 3, title: 'Startup', value: 'Startup' },
	{ id: 5, title: 'Other', value: 'Other' },
];

export const EMPLOYMENT_TYPE: FilterItem<VacancyEmploymentForm>[] = [
	{ id: 1, title: 'Fulltime', value: 'Fulltime' },
	{ id: 2, title: 'Parttime', value: 'Parttime' },
	{ id: 3, title: 'Project', value: 'Project' },
	{ id: 4, title: 'Shift', value: 'Shift' },
];

export const SALARY_BUCKET: FilterItem<string>[] = [
	{ id: 1, title: 'до 80К', value: 'under_80' },
	{ id: 2, title: '81-150К', value: 'from_80_to_150' },
	{ id: 3, title: '151-250К', value: 'from_150_to_250' },
	{ id: 4, title: '250+К', value: 'over_250' },
];

export const ENGLISH_LEVEL: MultiFilterItem<VacancyEnglishLevel>[] = [
	{ id: 1, title: 'A1-A2', value: ['A1', 'A2'] },
	{ id: 2, title: 'B1-B2', value: ['B1', 'B2'] },
	{ id: 3, title: 'C1-C2', value: ['C1', 'C2'] },
];
