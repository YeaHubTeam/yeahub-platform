import {
	ARTICLE_CONTENT_TYPE_OPTIONS,
	ARTICLE_FORMAT_OPTIONS,
	ARTICLE_TOPIC_OPTIONS,
	ArticleContentType,
	ArticleFormat,
	ArticlesFilterParams,
	ArticleTopics,
} from '@/entities/article';

const isArticleTopic = (value: string): value is ArticleTopics => {
	return ARTICLE_TOPIC_OPTIONS.some((option) => option.value === value);
};

const isArticleContentType = (value?: string): value is ArticleContentType => {
	return ARTICLE_CONTENT_TYPE_OPTIONS.some((option) => option.value === value);
};

const isArticleFormat = (value?: string): value is ArticleFormat => {
	return ARTICLE_FORMAT_OPTIONS.some((option) => option.value === value);
};

const getListParam = (params: URLSearchParams, key: string): string[] | undefined => {
	const values = params
		.getAll(key)
		.flatMap((value) => value.split(','))
		.filter(Boolean);

	return values.length > 0 ? values : undefined;
};

const parseNumberList = (values?: string[]): number[] | undefined => {
	if (!values) return undefined;
	const list = values.map(Number).filter((item) => !Number.isNaN(item));

	return list.length > 0 ? list : undefined;
};

const parseTopics = (values?: string[]): ArticleTopics[] | undefined => {
	if (!values) return undefined;
	const topics = values.filter(isArticleTopic);

	return topics.length > 0 ? topics : undefined;
};

export const useGetArticlesFilterParams = (initialParams: ArticlesFilterParams) => {
	const params = new URLSearchParams(location.search);
	const parsedParams = Object.fromEntries(params.entries());

	const currentParams: ArticlesFilterParams = {
		page: parsedParams.page ? Number(parsedParams.page) : initialParams.page,
		title: parsedParams.title || initialParams.title,
		specializations:
			parseNumberList(getListParam(params, 'specializations')) ?? initialParams.specializations,
		skills: parseNumberList(getListParam(params, 'skills')) ?? initialParams.skills,
		topics: parseTopics(getListParam(params, 'topics')) ?? initialParams.topics,
		contentType: isArticleContentType(parsedParams.contentType)
			? parsedParams.contentType
			: initialParams.contentType,
		format: isArticleFormat(parsedParams.format) ? parsedParams.format : initialParams.format,
	};

	return currentParams;
};
