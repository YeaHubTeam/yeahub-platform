import { VacancyMarketSpecializationItem } from '../model/types/vacancyMarket';

export const getUniqueIndustries = (specializations: VacancyMarketSpecializationItem[]): string[] =>
	Array.from(new Set(specializations.flatMap(({ availableIndustries }) => availableIndustries)));
