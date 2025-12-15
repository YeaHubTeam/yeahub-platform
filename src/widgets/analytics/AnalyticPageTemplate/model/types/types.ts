import type { ReactNode } from 'react';

export interface AnalyticFilterParams {
	skill?: number;
	specialization?: number;
	page?: number;
}

export interface AnalyticPageTemplateMobileListItemField {
	label: string;
	value: string | number;
}

export interface AnalyticPageTemplateMobileListItem {
	title: string | ReactNode;
	badge?: string;
	imageSrc?: string;
	fields: AnalyticPageTemplateMobileListItemField[];
	suffix?: ReactNode;
	isCurrentUser?: boolean;
}
