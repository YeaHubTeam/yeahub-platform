export type HhAnalyticsMode = 'skills' | 'keywords';

export type HhAnalyticsFiltersParams = {
	page?: number;
	specialization?: number;
	mode?: HhAnalyticsMode;
};
