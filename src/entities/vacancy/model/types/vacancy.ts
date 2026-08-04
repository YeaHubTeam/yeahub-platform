import type { Response } from '@/shared/libs';
import { IconName } from '@/shared/ui/Icon';

import type { Skill } from '@/entities/skill/@x/vacancy';
import type { Specialization } from '@/entities/specialization/@x/vacancy';

export type VacancySource = 'hh' | 'habr' | 'telegram' | 'company_site' | 'hr' | 'anonymous' | null;
export type VacancyEmploymentForm = 'Fulltime' | 'Parttime' | 'Project' | 'Shift' | null;
export type VacancyGrade = 'Trainee' | 'Junior' | 'Middle' | 'Senior' | 'Lead' | 'Head' | null;
export type VacancyEnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | null;
export type VacancyWorkFormat = 'Office' | 'Remote' | 'Hybrid' | 'Field' | null;
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
export type VacancyStatus = 'active' | 'archived' | null;
export type VacancySalaryCurrency = 'RUB' | 'USD' | 'EUR' | 'UZS' | 'KZT' | null;
export type VacancySkill = Pick<Skill, 'id' | 'title'>;
export type VacancySpecialization = Pick<Specialization, 'id' | 'title'>;

export interface VacancyAiProfile {
	providerCode: string;
	providerVacancyId: string;
	name: string;
	company: string;
	extra: VacancyExtra[];
	keySkills: string[] | null;
	plusSkills: string[] | null;
	tasks: string[];
	keywords: string[];
	companyType: VacancyCompanyType;
	industry: VacancyIndustry;
	grade: VacancyGrade;
	createdAt: string;
	updatedAt: string;
}

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

export interface VacancyExtra {
	key: string;
	value: string;
}

export interface VacancySalary {
	from: number | null;
	to: number | null;
	currency: string | null;
}

export interface Vacancy {
	id: string;
	source: VacancySource;
	sourceVacancyId: string;
	title: string;
	description: string;
	status: VacancyStatus;
	area: string;
	employmentForm: VacancyEmploymentForm | null;
	internship: boolean;
	grade: VacancyGrade | null;
	englishLevel: VacancyEnglishLevel | null;
	workFormat: VacancyWorkFormat[] | null;
	industry: VacancyIndustry | null;
	companyType: VacancyCompanyType | null;
	specializationId: number;
	salary: VacancySalary;
	publishedAt: string;
	sourcePublishedAt: string;
	applyVacancyUrl: string;
	company: VacancyCompany;
	skills: VacancySkill[];
	aiProfile: VacancyAiProfile;
	preparation: VacancyPreparation;
}

export type VacancyListItem = Omit<
	Vacancy,
	| 'sourceVacancyId'
	| 'description'
	| 'status'
	| 'industry'
	| 'companyType'
	| 'specializationId'
	| 'sourcePublishedAt'
	| 'applyVacancyUrl'
>;

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
export type GetVacancyByIdResponse = Vacancy;

export interface VacancyPreparation {
	collectionsCount: number;
	questionsCount: number;
	tasksCount: number;
}

export interface VacancyTag {
	id: 'area' | 'grade' | 'employmentForm' | 'industry' | 'companyType';
	icon: IconName;
	category: string;
}
