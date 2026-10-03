export interface VacancyMarketTopItem {
	title: string;
	count: number;
	percent: number;
}

export interface VacancyMarketMatchedSkill extends VacancyMarketTopItem {
	skillId: number;
}

export interface VacancyMarketSpecialization {
	specializationId: number;
	name: string;
	vacancyCount: number;
	analyzedVacancyCount: number;
	topSkills: VacancyMarketTopItem[];
	topKeywords: VacancyMarketTopItem[];
}

export interface VacancyMarketOverview {
	updatedAt: string;
	specializations: VacancyMarketSpecialization[];
	industry: string;
	availableIndustries: string[];
	totalAnalyzedVacancyCount: number;
}

export interface VacancyMarketSpecializationById extends VacancyMarketSpecialization {
	industry: string;
	updatedAt: string;
	availableIndustries: string[];
	skillsVacancyCount: number;
	topMatchedSkills: VacancyMarketMatchedSkill[];
	topTasks: VacancyMarketTopItem[];
	priority: VacancyMarketTopItem[];
}
