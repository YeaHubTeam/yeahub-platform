import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Card } from '@/shared/ui/Card';

import { useGetTopicsListQuery } from '@/entities/topic';

import { TopicsTable } from '@/widgets/TopicsTable';

import { getSelectedTopics } from '../../model/selectors/topicsPageSelectors';
import { topicsPageActions } from '../../model/slices/topicsPageSlice';

const TopicsPage = () => {
	const dispatch = useAppDispatch();

	const { data: topics } = useGetTopicsListQuery({ page: 1, limit: 7 });

	const selectedTopics = useSelector(getSelectedTopics);

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
