import type { Response } from '@/shared/libs';

import type { Skill } from '@/entities/skill/@x/vacancy';
import type { Specialization } from '@/entities/specialization/@x/vacancy';

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
export type VacancySalaryBucket = 'under_80' | 'from_80_to_150' | 'from_150_to_250' | 'over_250';
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
	source: VacancySource;
	title: string;
	area: string;
	publishedAt: string;
	employmentForm: VacancyEmploymentForm;
	internship: boolean;
	grade: VacancyGrade;
	englishLevel: VacancyEnglishLevel;
	workFormat: VacancyWorkFormat[];
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
	area?: string;
	skillId?: number[];
	companyId?: string[];
	employmentForm?: VacancyEmploymentForm[];
	grade?: VacancyGrade[];
	englishLevel?: VacancyEnglishLevel[];
	industry?: VacancyIndustry[];
	companyType?: VacancyCompanyType[];
	workFormat?: VacancyWorkFormat[];
	salaryBucket?: VacancySalaryBucket[];
}

export type GetVacanciesListResponse = Response<Vacancy[]>;
