import { useParams } from 'react-router-dom';

import { useAppSelector, useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Flex } from '@/shared/ui/Flex';

import { getIsAuthor, getUserId } from '@/entities/profile';
import { TopicAdditionalInfo, useGetTopicByIdQuery } from '@/entities/topic/index';

import { DeleteTopicButton } from '@/features/topics/deleteTopic';
import { TopicEditButton } from '@/features/topics/editTopics';

import { TopicBody } from '@/widgets/topic/TopicBody/index';
import { TopicHeader } from '@/widgets/topic/TopicHeader';

import { TopicPageSkeleton } from './TopicPage.skeleton';

const TopicPage = () => {
	const { isMobile, isTablet } = useScreenSize();

	const { topicId } = useParams();
	const { data: topic, isFetching, isLoading } = useGetTopicByIdQuery({ topicId: topicId! });
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

	const { skill, createdAt, updatedAt } = topic || {};

	const isDisabled = isAuthor && topic?.createdBy?.id !== userId;

	if (isLoading || isFetching) {
		return <TopicPageSkeleton />;
	}

	if (!topic) {
		return null;
	}

	return (
		<>
			<BackHeader>
				<DeleteTopicButton topicId={topic.id} isDetailPage disabled={isDisabled} />
				<TopicEditButton topicId={topic.id} isDisabled={isDisabled} />
			</BackHeader>
			<Flex gap="20" align="start">
				<Flex gap="20" direction="column" flex={1} maxWidth>
					<TopicHeader topic={topic} />
					<TopicBody description={topic.description} />
				</Flex>

				{!isMobile && !isTablet && (
					<TopicAdditionalInfo skill={skill} createdAt={createdAt} updatedAt={updatedAt} />
				)}
			</Flex>
		</>
	);
};

export default TopicPage;
