import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Topics } from '@/shared/config';
import { route, SelectedAdminEntities, useAppDispatch, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TablePagination } from '@/shared/ui/TablePagination';

import { useGetTopicsListQuery } from '@/entities/topic';

import { TopicsFilters, useTopicsFilters } from '@/features/topic/filterTopics';
import { DeleteTopicsButton } from '@/features/topics/deleteTopics';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';
import { TopicsTable } from '@/widgets/topic/TopicsTable';

import { getSelectedTopics } from '../../model/selectors/topicsPageSelectors';
import { topicsPageActions } from '../../model/slices/topicsPageSlice';

const TopicsPage = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(i18Namespace.topic);
	const navigate = useNavigate();

	const { filters, hasFilters, onChangeTitle, onChangeSkillIds, onChangePage, onResetFilters } =
		useTopicsFilters({ page: 1 });

	const {
		data: topicsWithTitle,
		isLoading,
		isError,
		refetch,
	} = useGetTopicsListQuery({
		page: filters.page,
		limit: 10,
		title: filters.title,
		skillIds: filters.skillIds,
	});
	const selectedTopics = useAppSelector(getSelectedTopics);

	const onSelectTopics = (ids: SelectedAdminEntities) => {
		dispatch(topicsPageActions.setSelectedTopics(ids));
	};

	const clearSelectedTopics = () => {
		dispatch(topicsPageActions.setSelectedTopics([]));
	};

	const topics = topicsWithTitle?.data ?? [];
	const hasTopics = topics.length > 0;

	const content = hasTopics ? (
		<>
			<Flex componentType="main" direction="column" gap="24">
				<SearchSection
					to="create"
					onSearch={onChangeTitle}
					searchValue={filters.title}
					renderFilter={() => (
						<TopicsFilters filters={filters} onChangeSkillIds={onChangeSkillIds} />
					)}
					onResetFilters={onResetFilters}
					showResetFilterButton={hasFilters}
					hasFilters={Boolean((filters.skillIds || []).length)}
					showRemoveButton={selectedTopics.length > 0}
					renderRemoveButton={() => (
						<DeleteTopicsButton
							topicsToRemove={selectedTopics}
							onSuccess={() => clearSelectedTopics()}
						/>
					)}
				/>
				<Card>
					<TopicsTable
						topics={topicsWithTitle?.data}
						selectedTopics={selectedTopics}
						onSelectTopics={onSelectTopics}
						onDeleteSuccess={() => clearSelectedTopics()}
					/>
					<TablePagination
						page={filters.page || 1}
						onChangePage={onChangePage}
						limit={topicsWithTitle?.limit ?? 10}
						total={topicsWithTitle?.total ?? 0}
					/>
				</Card>
			</Flex>
		</>
	) : null;

	const onNavigateCreateTopic = () => {
		navigate(route(ROUTES.admin.topics.create.page));
	};

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Topics.STUB_EMPTY_TOPICS_TITLE),
			subtitle: t(Topics.STUB_EMPTY_TOPICS_SUBTITLE),
			buttonText: t(Topics.STUB_EMPTY_TOPICS_SUBMIT),
			onClick: onNavigateCreateTopic,
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasTopics}
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
			hasFilters={hasFilters}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TopicsPage;
