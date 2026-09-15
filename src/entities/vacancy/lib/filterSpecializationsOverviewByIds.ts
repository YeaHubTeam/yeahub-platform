import { VacancyMarketOverview } from '../model/types/vacancyMarket';

export const filterSpecializationsOverviewByIds = (
	specializatiions: VacancyMarketOverview['specializations'],
	ids: number[],
): VacancyMarketOverview['specializations'] =>
	specializatiions.filter(({ specializationId }) => ids.includes(specializationId));
