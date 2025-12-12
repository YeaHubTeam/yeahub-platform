import { SelectedAdminEntities, useAppDispatch, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetTopicsListQuery } from '@/entities/topic';

import { SearchSection } from '@/widgets/SearchSection';
import { TopicsTable } from '@/widgets/topic/TopicsTable';

import { getSelectedTopics } from '../../model/selectors/topicsPageSelectors';
import { topicsPageActions } from '../../model/slices/topicsPageSlice';

const TopicsPage = () => {
	const dispatch = useAppDispatch();

	const { data: topics } = useGetTopicsListQuery({ page: 1 });
	const selectedTopics = useAppSelector(getSelectedTopics);

	const onSelectTopics = (ids: SelectedAdminEntities) => {
		dispatch(topicsPageActions.setSelectedTopics(ids));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection to="create" />
			<Card>
				<TopicsTable
					topics={topics?.data}
					selectedTopics={selectedTopics}
					onSelectTopics={onSelectTopics}
				/>
			</Card>
		</Flex>
	);
};

export default TopicsPage;
