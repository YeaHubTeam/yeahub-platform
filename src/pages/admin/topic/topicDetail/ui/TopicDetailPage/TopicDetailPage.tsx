import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Topics } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { useCanManageAdminEntity } from '@/entities/profile';
import { useGetTopicByIdQuery, TopicAdditionalInfo, TopicCard } from '@/entities/topic';

import { useDeleteTopicMutation } from '@/features/topics/deleteTopic';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { TopicDetailPageSkeleton } from './TopicDetailPage.skeleton';

const TopicDetailPage = () => {
	const { topicId = '' } = useParams<{ topicId: string }>();
	const { t } = useTranslation(i18Namespace.translation);
	const { data: topic, isLoading, isError, refetch } = useGetTopicByIdQuery(topicId);
	const [deleteTopic] = useDeleteTopicMutation();
	const canManage = useCanManageAdminEntity({ ownerId: topic?.createdBy?.id });

	const handleDeleteTopic = () => {
		if (topic) {
			void deleteTopic(topic.id);
		}
	};

	const hasTopic = topic && Object.keys(topic).length > 0;

	const content = hasTopic ? (
		<>
			<HeaderAdminPageDetailCard onDelete={handleDeleteTopic} isDisabled={!canManage} />

			<Flex gap="20" direction="row">
				<TopicCard topic={topic} />
				<TopicAdditionalInfo topic={topic} />
			</Flex>
		</>
	) : null;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Topics.STUB_EMPTY_TOPIC_TITLE),
			subtitle: t(Topics.STUB_EMPTY_TOPIC_SUBTITLE),
			buttonText: t(Topics.STUB_EMPTY_TOPIC_SUBMIT),
			onClick: refetch,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			hasData={hasTopic}
			isLoading={isLoading}
			hasError={isError}
			stubs={stubs}
			content={content}
			roles={['admin', 'author']}
			skeleton={<TopicDetailPageSkeleton />}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TopicDetailPage;
