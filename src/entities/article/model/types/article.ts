import { Response } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

import { Specialization } from '@/entities/specialization/@x/article';

export type ArticleTopic = 'interview' | 'system_design' | 'basics' | 'advanced';

export interface ArticleSkill {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	createdAt: string;
	updatedAt: string;
	specializations: Specialization[];
}

export interface Article {
	id: number;
	title: string;
	slug: string;
	excerpt: string;
	bodyHtml: string;
	imageSrc: string | null;
	keywords: string[] | null;
	metaTitle: string;
	metaDescription: string;
	ogTitle: string;
	ogDescription: string;
	ogImage: string | null;
	topics: ArticleTopic[] | null;
	contentType: string | null;
	format: string | null;
	status: string;
	publishedAt: string | null;
	createdAt: string;
	updatedAt: string;
	createdBy: Author;
	origin: string;
	moderationStatus: string | null;
	articleSpecializations: Specialization[];
	articleSkills: ArticleSkill[];
}

export interface GetArticlesListParamsRequest {
	page?: number;
	limit?: number;
	search?: string;
	status?: string;
	specializations?: number | number[];
	topics?: string | string[];
	contentType?: string;
	format?: string;
	skills?: number | number[];
	moderationStatus?: string;
	origin?: string;
}

export type GetArticlesListResponse = Response<Article[]>;
