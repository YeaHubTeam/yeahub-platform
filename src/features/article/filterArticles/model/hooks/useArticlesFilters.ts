import { useQueryFilterParams } from '@/shared/libs';

import { ArticlesFilterParams } from '@/entities/article';

import { useGetArticlesFilterParams } from './useGetArticlesFilterParams';

export const useArticlesFilters = (initialParams: ArticlesFilterParams) => {
	const currentParams = useGetArticlesFilterParams(initialParams);
	const { filters, onFilterChange, onResetFilters } = useQueryFilterParams<ArticlesFilterParams>(
		initialParams,
		currentParams,
	);

	const hasFilters =
		(filters.page || 1) > 1 ||
		Boolean(filters.title) ||
		(filters.specializations || []).length > 0 ||
		(filters.skills || []).length > 0 ||
		(filters.topics || []).length > 0 ||
		Boolean(filters.contentType) ||
		Boolean(filters.format);

	const onChangePage = (page: ArticlesFilterParams['page']) => {
		onFilterChange({ page });
	};

	const onChangeTitle = (title: ArticlesFilterParams['title']) => {
		onFilterChange({ title, page: 1 });
	};

	const onChangeSpecializations = (specializations: ArticlesFilterParams['specializations']) => {
		onFilterChange({
			specializations,
			skills: undefined,
			page: 1,
		});
	};

	const onChangeSkills = (skills: ArticlesFilterParams['skills']) => {
		onFilterChange({ skills, page: 1 });
	};

	const onChangeTopics = (topics: ArticlesFilterParams['topics']) => {
		onFilterChange({
			topics: topics && topics.length > 0 ? topics : undefined,
			page: 1,
		});
	};

	const onChangeContentType = (contentType: ArticlesFilterParams['contentType']) => {
		onFilterChange({ contentType, page: 1 });
	};

	const onChangeFormat = (format: ArticlesFilterParams['format']) => {
		onFilterChange({ format, page: 1 });
	};

	return {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeTitle,
		onChangeSpecializations,
		onChangeSkills,
		onChangeTopics,
		onChangeContentType,
		onChangeFormat,
	};
};
