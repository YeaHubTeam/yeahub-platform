import { SelectedAdminEntities, useAppDispatch, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetTopicsListQuery } from '@/entities/topic';

import { TopicSkillFilter, useTopicsFilters } from '@/features/topic/filterTopics';

import { SearchSection } from '@/widgets/SearchSection';
import { TopicsTable } from '@/widgets/topic/TopicsTable';

import { getSelectedTopics } from '../../model/selectors/topicsPageSelectors';
import { topicsPageActions } from '../../model/slices/topicsPageSlice';
const TopicsPage = () => {
	const dispatch = useAppDispatch();

	const { filters, hasFilters, onChangeTitle, onChangeSkillIds, onChangePage, onResetFilters } =
		useTopicsFilters({ page: 1 });

	const { data: topicsWithTitle } = useGetTopicsListQuery({
		page: filters.page,
		limit: 10,
		title: filters.title,
		skillIds: filters.skillIds,
	});

	const { data: topicsFallback } = useGetTopicsListQuery(
		{ page: 1, limit: 1000, skillIds: filters.skillIds },
		{ skip: !filters.title },
	);
	const selectedTopics = useAppSelector(getSelectedTopics);

	const onSelectTopics = (ids: SelectedAdminEntities) => {
		dispatch(topicsPageActions.setSelectedTopics(ids));
	};

	const baseData =
		filters.title && topicsWithTitle?.data && topicsWithTitle.data.length === 0
			? topicsFallback?.data
			: topicsWithTitle?.data;

	const displayedTopics = baseData?.filter((t) =>
		filters.title ? t.title.toLowerCase().includes((filters.title as string).toLowerCase()) : true,
	);

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				onSearch={onChangeTitle}
				searchValue={filters.title}
				renderFilter={() => (
					<TopicSkillFilter value={filters.skillIds} onChange={onChangeSkillIds} />
				)}
				onResetFilters={onResetFilters}
				showResetFilterButton={hasFilters}
				hasFilters={Boolean((filters.skillIds || []).length)}
			/>
			<Card>
				<TopicsTable
					topics={displayedTopics ?? baseData}
					selectedTopics={selectedTopics}
					onSelectTopics={onSelectTopics}
				/>
				<TablePagination
					page={filters.page || 1}
					onChangePage={onChangePage}
					limit={topicsWithTitle?.limit ?? topicsFallback?.limit ?? 10}
					total={topicsWithTitle?.total ?? topicsFallback?.total ?? 0}
				/>
			</Card>
		</Flex>
	);
};

export default TopicsPage;
