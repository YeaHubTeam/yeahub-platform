import { ArticleFormValues, Article } from '@/entities/article';

export type CreateArticleFormValues = Omit<ArticleFormValues, 'slug'> & {
	slug?: string;
};

export type CreateArticleBodyRequest = CreateArticleFormValues & {
	status: 'published';
};

export type CreateArticleResponse = Article;
