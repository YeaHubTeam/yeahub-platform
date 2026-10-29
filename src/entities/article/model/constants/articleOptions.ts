import { Articles } from '@/shared/config';

import { ArticleContentType, ArticleFormat, ArticleTopics } from '../types/article';

interface ArticleOption<T extends string> {
	value: T;
	labelKey: Articles;
}

export const ARTICLE_TOPIC_OPTIONS: ArticleOption<ArticleTopics>[] = [
	{ value: 'interview', labelKey: Articles.TOPICS_TYPE_INTERVIEW },
	{ value: 'system_design', labelKey: Articles.TOPICS_TYPE_SYSTEM_DESIGN },
	{ value: 'basics', labelKey: Articles.TOPICS_TYPE_BASICS },
	{ value: 'advanced', labelKey: Articles.TOPICS_TYPE_ADVANCED },
];

export const ARTICLE_CONTENT_TYPE_OPTIONS: ArticleOption<ArticleContentType>[] = [
	{ value: 'theory', labelKey: Articles.CONTENT_TYPE_THEORY },
	{ value: 'practice', labelKey: Articles.CONTENT_TYPE_PRACTICE },
	{ value: 'interview', labelKey: Articles.CONTENT_TYPE_INTERVIEW },
	{ value: 'roadmap', labelKey: Articles.CONTENT_TYPE_ROADMAP },
	{ value: 'case_study', labelKey: Articles.CONTENT_TYPE_CASE_STUDY },
];

export const ARTICLE_FORMAT_OPTIONS: ArticleOption<ArticleFormat>[] = [
	{ value: 'guide', labelKey: Articles.FORMAT_TYPE_GUIDE },
	{ value: 'breakdown', labelKey: Articles.FORMAT_TYPE_BREAKDOWN },
	{ value: 'qa', labelKey: Articles.FORMAT_TYPE_QA },
	{ value: 'interview_prep', labelKey: Articles.FORMAT_TYPE_INTERVIEW_PREP },
];
