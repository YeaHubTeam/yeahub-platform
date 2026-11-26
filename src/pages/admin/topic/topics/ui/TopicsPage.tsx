import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Topics, Translation } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetTopicsListQuery } from '@/entities/topic';

import { TopicsFilters, useTopicsFilters } from '@/features/topic/filterTopics';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';
import { mapTopicsToTableItems, TopicsTable } from '@/widgets/TopicsTable';

const TopicsPage = () => {
	const [selectedTopics, setSelectedTopics] = useState<SelectedAdminEntities>([]);
	const { t } = useTranslation([i18Namespace.topic, i18Namespace.translation]);
	const navigate = useNavigate();

	const { filters, hasFilters, onChangePage, onChangeTitle, onChangeSkills, onResetFilters } =
		useTopicsFilters({ page: 1 });

	const {
		data: topicsResponse,
		isLoading,
		isError,
		refetch,
	} = useGetTopicsListQuery({
		page: filters.page,
		title: filters.title,
		skillIds: filters.skillIds,
	});

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Topics.STUB_EMPTY_TOPICS_TITLE),
			subtitle: t(Topics.STUB_EMPTY_TOPICS_SUBTITLE),
			buttonText: t(Topics.STUB_EMPTY_TOPICS_SUBMIT),
			onClick: () => navigate(ROUTES.admin.topics.create.page),
		},
		'filter-empty': {
			title: t(Topics.STUB_EMPTY_TOPIC_TITLE),
			subtitle: t(Topics.STUB_EMPTY_TOPIC_SUBTITLE),
			buttonText: t(Translation.STUB_FILTER_SUBMIT, { ns: i18Namespace.translation }),
			onClick: onResetFilters,
		},
		error: { onClick: refetch },
	};

	return (
		<>
			<PageWrapper
				roles={['admin', 'author']}
				isLoading={isLoading}
				hasData={Boolean(topicsResponse?.data?.length)}
				hasError={isError}
				hasFilters={hasFilters}
				stubs={stubs}
				content={
					<TopicsTable
						topics={mapTopicsToTableItems(topicsResponse?.data || [])}
						selectedTopics={selectedTopics}
						onSelectTopics={setSelectedTopics}
					/>
				}
				paginationOptions={{
					page: filters.page || 1,
					limit: topicsResponse?.limit || 10,
					total: topicsResponse?.total || 0,
					onChangePage,
				}}
			>
				{({ content, pagination }) => (
					<Flex direction="column" gap="24">
						<SearchSection
							to="create"
							searchValue={filters.title}
							onSearch={onChangeTitle}
							hasFilters={Boolean(filters.skillIds?.length)}
							showResetFilterButton={hasFilters}
							onResetFilters={onResetFilters}
							renderFilter={() => (
								<TopicsFilters filters={filters} onChangeSkills={onChangeSkills} />
							)}
						/>
						<Card>
							{content}
							{pagination}
						</Card>
					</Flex>
				)}
			</PageWrapper>
		</>
	);
};

export default TopicsPage;
