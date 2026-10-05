import { Author } from '@/shared/ui/AuthorInfo';

import { Skill } from '@/entities/skill/@x/article';
import { Specialization } from '@/entities/specialization/@x/article';

export type ArticleTopics = 'interview' | 'system_design' | 'basics' | 'advanced';
export type ArticleContentType = 'theory' | 'practice' | 'interview' | 'roadmap' | 'case_study';
export type ArticleFormat = 'guide' | 'breakdown' | 'qa' | 'interview_prep';
export type ArticleStatus = 'draft' | 'published' | 'hidden' | 'archived';
export type ArticleModerationStatus =
	'draft' | 'submitted' | 'approved' | 'rejected' | 'returned_for_revision';

export interface Article {
	id: number;
	title: string;
	slug: string;
	bodyHtml: string;
	excerpt?: string;
	imageSrc?: string;
	keywords?: Array<string>;
	metaTitle?: string;
	metaDescription?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	topics?: Array<ArticleTopics>;
	contentType?: ArticleContentType;
	format?: ArticleFormat;
	status: ArticleStatus;
	publishedAt?: string;
	createdAt: string;
	createdBy?: Author;
	updatedAt: string;
	origin: 'editorial' | 'community';
	moderationStatus?: ArticleModerationStatus;
	articleSpecializations: Array<Specialization>;
	articleSkills: Array<Skill>;
	questions?: Array<string>;
	testQuestions?: Array<string>;
	taskIds?: Array<string>;
}

export type ArticleFormValues = Pick<
	Article,
	| 'title'
	| 'bodyHtml'
	| 'slug'
	| 'format'
	| 'metaTitle'
	| 'metaDescription'
	| 'ogTitle'
	| 'ogDescription'
	| 'topics'
	| 'contentType'
> & {
	specializations: number[];
	skills: number[];
};
