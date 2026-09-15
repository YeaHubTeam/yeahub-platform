import { VacancyMarketSpecializationItem } from '../model/types/vacancyMarket';

export const getSpecializationIdsByIndustry = (
	specializations: VacancyMarketSpecializationItem[],
	industry: string,
): number[] =>
	specializations
		.filter(({ availableIndustries }) => availableIndustries.includes(industry))
		.map(({ specializationId }) => specializationId);
