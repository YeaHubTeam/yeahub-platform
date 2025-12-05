import { SelectedAdminEntities } from '@/shared/libs/app';
import { useAppDispatch } from '@/shared/libs/redux';
import { useAppSelector } from '@/shared/libs/redux';
import { Card } from '@/shared/ui/Card';

import { useGetTopicsListQuery } from '@/entities/topic';

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
		<Card>
			<TopicsTable
				topics={topics?.data}
				selectedTopics={selectedTopics}
				onSelectTopics={onSelectTopics}
			/>
		</Card>
	);
};

export default TopicsPage;
