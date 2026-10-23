import { Article, CreateOrEditArticleFormValues } from '@/entities/article';

export type EditArticleFormValues = CreateOrEditArticleFormValues;

export type EditArticleBodyRequest = EditArticleFormValues & { status: 'published' };

export type EditArticleResponse = Article;

export type EditArticleError =
	| 'article.article.body.empty'
	| 'article.article.relations.required'
	| 'auth.auth.unauthorized'
	| 'auth.user.verified'
	| 'auth.roles.admin_or_author_required'
	| 'auth.roles.author_can_change_only_own'
	| 'article.article.not_found'
	| 'article.specialization.not_found'
	| 'article.skill.not_found'
	| 'article.question.not_found'
	| 'article.test_question.not_found'
	| 'article.task.not_found'
	| 'storage.image.invalid_format'
	| 'storage.image.too_large';
