import type { Response } from '@/shared/libs';

import { Skill } from '@/entities/skill/@x/vacancy';
import { Specialization } from '@/entities/specialization/@x/vacancy';

export type VacancySource = 'hh' | 'habr' | 'telegram' | 'company_site' | 'hr' | 'anonymous';
export type VacancyEmploymentForm = 'Fulltime' | 'Parttime' | 'Project' | 'Shift';
export type VacancyGrade = 'Trainee' | 'Junior' | 'Middle' | 'Senior' | 'Lead' | 'Head';
export type VacancyEnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type VacancyWorkFormat = 'Office' | 'Remote' | 'Hybrid';
export type VacancyIndustry =
	| 'AI'
	| 'SaaS'
	| 'FinTech'
	| 'GameDev'
	| 'Ecommerce'
	| 'Robotics'
	| 'IGamming'
	| 'Retail'
	| 'MedTech'
	| 'EdTech'
	| 'HRTech'
	| 'Cybersecurity'
	| 'Logistics'
	| 'Travel'
	| 'Telecom'
	| 'Other';
export type VacancyCompanyType = 'Product' | 'Outsource' | 'Startup' | 'Other';
export type VacancySkill = Pick<Skill, 'id' | 'title'>;
export type VacancySpecialization = Pick<Specialization, 'id' | 'title'>;

export interface VacancyCompany {
	id: string | null;
	title: string;
	imageSrc: string | null;
}

export interface VacancyPreparation {
	collectionsCount: number;
	questionsCount: number;
	tasksCount: number;
}

export interface VacancySalary {
	from: number | null;
	to: number | null;
	currency: string | null;
}

export interface Vacancy {
	id: string;
	source: VacancySource | null;
	title: string;
	area: string;
	publishedAt: string;
	employmentForm: VacancyEmploymentForm | null;
	internship: boolean;
	grade: VacancyGrade | null;
	englishLevel: VacancyEnglishLevel | null;
	workFormat: VacancyWorkFormat[] | null;
	company: VacancyCompany;
	salary: VacancySalary;
	specialization: VacancySpecialization;
	skills: VacancySkill[];
	preparation: VacancyPreparation;
}

export interface GetVacanciesListParamsRequest {
	page?: number;
	limit?: number;
	search?: string;
	source?: string;
	specializationId?: number;
	skillId?: string;
	companyId?: string;
	area?: string;
	employmentForm?: string;
	grade?: string;
	englishLevel?: string;
	industry?: string;
	companyType?: string;
	workFormat?: string;
	salaryBucket?: string;
}

export type GetVacanciesListResponse = Response<Vacancy[]>;
