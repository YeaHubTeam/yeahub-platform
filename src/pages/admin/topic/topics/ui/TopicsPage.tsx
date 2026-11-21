import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Topics, Translation } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { SkillsListField } from '@/entities/skill';
import { useGetTopicsListQuery } from '@/entities/topic';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';
import { TopicsTable } from '@/widgets/TopicsTable';

import { mapTopicsToTableItems } from '../lib/mapTopicsToTableItems';

const TopicsPage = () => {
	const [seacrhValue, setSearchValue] = useState('');
	const [page, setPage] = useState(1);
	const [selectedTopics, setSelectedTopics] = useState<SelectedAdminEntities>([]);
	const [selectedSkills, setSelectedSkills] = useState<number[] | undefined>(undefined);
	const { t } = useTranslation([i18Namespace.topic, i18Namespace.translation]);
	const navigate = useNavigate();

	const {
		data: topicsResponse,
		isLoading,
		isError,
		refetch,
	} = useGetTopicsListQuery({ page, title: seacrhValue, skillIds: selectedSkills });

	const hasFilters = Boolean(selectedSkills?.length);
	const showResetFilterButton = hasFilters || Boolean(seacrhValue) || page > 1;

	const onChangeSearch = (value: string) => {
		setSearchValue(value);
		setPage(1);
	};

	const onChangeSkills = (skills: number[] | undefined) => {
		setSelectedSkills(skills);
		setPage(1);
	};

	const onResetFilters = () => {
		setSelectedSkills(undefined);
		setSearchValue('');
		setPage(1);
	};

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
				hasFilters={hasFilters || Boolean(seacrhValue)}
				stubs={stubs}
				content={
					<TopicsTable
						topics={mapTopicsToTableItems(topicsResponse?.data || [])}
						selectedTopics={selectedTopics}
						onSelectTopics={setSelectedTopics}
					/>
				}
				paginationOptions={{
					page,
					limit: topicsResponse?.limit || 10,
					total: topicsResponse?.total || 0,
					onChangePage: setPage,
				}}
			>
				{({ content, pagination }) => (
					<Flex direction="column" gap="24">
						<SearchSection
							to="create"
							searchValue={seacrhValue}
							onSearch={onChangeSearch}
							hasFilters={hasFilters}
							showResetFilterButton={showResetFilterButton}
							onResetFilters={onResetFilters}
							renderFilter={() => (
								<SkillsListField selectedSkills={selectedSkills} onChangeSkills={onChangeSkills} />
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
