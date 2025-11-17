export interface AnalyticFilterParams {
	skill?: number;
	specialization?: number;
	page?: number;
}

interface AnalyticPageTemplateMobileListItemField {
	label: string;
	value: string | number;
}

export interface AnalyticPageTemplateMobileListItem {
	title: string;
	badge?: string;
	imageSrc?: string;
	fields: AnalyticPageTemplateMobileListItemField[];
}
