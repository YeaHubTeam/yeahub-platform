import { API_VERSION } from '@/shared/config';

export const vacanciesMarketApiUrls = {
	overview: `${API_VERSION.V1}/atsopt/market/overview`,
} as const;
