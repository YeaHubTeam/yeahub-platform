export interface VacanciesMarketPortraitItem {
	title: string;
	count: number;
	percent: number;
}

export interface VacanciesMarketSpecialization {
	specializationId: number;
	name: string | null;
	vacancyCount: number;
	analyzedVacancyCount: number;
	topSkills: VacanciesMarketPortraitItem[];
	topKeywords: VacanciesMarketPortraitItem[];
}

export interface VacanciesMarketOverview {
	updatedAt: string | null;
	industry: string | null;
	availableIndustries: string[];
	totalAnalyzedVacancyCount: number;
	specializations: VacanciesMarketSpecialization[];
}
