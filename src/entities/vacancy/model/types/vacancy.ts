import type { Response } from '@/shared/libs';

import type { Skill } from '@/entities/skill/@x/vacancy';
import type { Specialization } from '@/entities/specialization/@x/vacancy';

export type VacancySource = 'hh' | 'habr' | 'telegram' | 'company_site' | 'hr' | 'anonymous' | null;
export type VacancyEmploymentForm = 'Fulltime' | 'Parttime' | 'Project' | 'Shift' | null;
export type VacancyGrade = 'Trainee' | 'Junior' | 'Middle' | 'Senior' | 'Lead' | 'Head' | null;
export type VacancyEnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | null;
export type VacancyWorkFormat = 'Office' | 'Remote' | 'Hybrid' | 'Field' | null;
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
}

export type GetVacanciesListResponse = Response<Vacancy[]>;
