import { ArticleContentType, ArticleFormat, ArticleTopics } from './article';

export interface ArticlesFilterParams {
	page?: number;
	title?: string;
	specializations?: number[];
	skills?: number[];
	topics?: ArticleTopics[];
	contentType?: ArticleContentType;
	format?: ArticleFormat;
}
