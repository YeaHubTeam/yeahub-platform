import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Topics, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetTopicByIdQuery, TopicAdditionalInfo, TopicCard } from '@/entities/topic';

import { DeleteTopicButton } from '@/features/topics/deleteTopic';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const TopicDetailPage = () => {
	const { topicId = '' } = useParams<{ topicId: string }>();
	const { t } = useTranslation(i18Namespace.translation);
	const { data: topic, isLoading, isError, refetch } = useGetTopicByIdQuery(topicId);

	const hasTopic = topic && Object.keys(topic).length > 0;

	const content = hasTopic ? (
		<>
			<Flex align="center" justify="between" gap="8" style={{ marginBottom: 34 }}>
				<BackButton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<DeleteTopicButton topicId={topic.id} isDetailPage />
					<NavLink
						style={{ marginLeft: 'auto' }}
						to={route(ROUTES.admin.topics.edit.page, topic.id)}
					>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>

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
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TopicDetailPage;
