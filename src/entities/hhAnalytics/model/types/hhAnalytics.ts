export type HhAnalyticsItem = {
	title: string;
	count: number;
};

export type HhAnalyticsItemResponse = {
	skills: HhAnalyticsItem[];
	keywords: HhAnalyticsItem[];
	vacanciesCount: number;
};
