import { API_VERSION } from '@/shared/config';

export const vacancyMarketApiUrls = {
	getVacancyMarketOverview: `${API_VERSION.V1}/atsopt/market/overview`,
	getVacancyMarketById: (id: string) => `${API_VERSION.V1}/atsopt/market/specializations/${id}`,
};
