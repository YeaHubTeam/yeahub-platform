import { SelectedAdminEntities, useAppDispatch, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetTopicsListQuery } from '@/entities/topic';

import { DeleteTopicsButton } from '@/features/topics/deleteTopics';

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

	const clearSelectedTopics = () => {
		dispatch(topicsPageActions.setSelectedTopics([]));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
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
					topics={topics?.data}
					selectedTopics={selectedTopics}
					onSelectTopics={onSelectTopics}
					onDeleteSuccess={() => clearSelectedTopics()}
				/>
			</Card>
		</Flex>
	);
};

export default TopicsPage;
