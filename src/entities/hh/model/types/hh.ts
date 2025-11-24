export type HhAnalyticsItem = {
	title: string;
	count: number;
};

export type GetHhAnalyticsItemResponse = {
	skills: HhAnalyticsItem[];
	keywords: HhAnalyticsItem[];
	vacanciesCount: number;
};
