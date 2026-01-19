import { useParams } from 'react-router-dom';

import { useGetTopicByIdQuery } from '@/entities/topic';

import { TopicEditForm } from '@/features/topics/editTopic';

const TopicEditPage = () => {
	const { topicId } = useParams<{ topicId: string }>();

	const { data: topic } = useGetTopicByIdQuery(topicId || '');

	if (!topic) return null;

	return <TopicEditForm topic={topic} />;
};

export default TopicEditPage;
