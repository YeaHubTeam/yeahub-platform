import { useParams } from 'react-router-dom';

import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { useGetTopicByIdQuery, TopicAdditionalInfo, TopicCard } from '@/entities/topic';

const TopicDetailPage = () => {
	const { topicId } = useParams<{ topicId: string }>();
	const { data: topic } = useGetTopicByIdQuery(topicId!);

	if (!topic) {
		return null;
	}

	return (
		<>
			<Flex align="center" justify="between" gap="8" style={{ marginBottom: 34 }}>
				<BackButton />
			</Flex>

			<Flex gap="20" direction="row">
				<TopicCard topic={topic} />
				<TopicAdditionalInfo topic={topic} />
			</Flex>
		</>
	);
};

export default TopicDetailPage;
