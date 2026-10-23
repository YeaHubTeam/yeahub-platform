import { Article, CreateOrEditArticleFormValues } from '@/entities/article';

export type CreateArticleFormValues = Omit<CreateOrEditArticleFormValues, 'id'>;

export type CreateArticleBodyRequest = CreateArticleFormValues & {
	status: 'published';
};

export type CreateArticleResponse = Article;
