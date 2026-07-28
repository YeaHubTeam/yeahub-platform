import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Topics } from '@/shared/config';

import { useGetTopicByIdQuery } from '@/entities/topic';

import { TopicEditForm } from '@/features/topics/editTopic';

import { AuthorEditRestriction } from '@/widgets/EditAccessGuard';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const TopicEditPage = () => {
	const { t } = useTranslation(i18Namespace.topic);
	const { topicId } = useParams<{ topicId: string }>();

	const { data: topic, isLoading, isError, refetch } = useGetTopicByIdQuery(topicId || '');

	const hasTopic = topic && Object.keys(topic).length > 0;

	const content = hasTopic ? (
		<AuthorEditRestriction
			authorId={topic.createdBy?.id}
			redirectTo={ROUTES.admin.topics.page}
			titleStub={t(Topics.STUB_EDIT_TOPIC_TITLE)}
			subtitleStub={t(Topics.STUB_EDIT_TOPIC_SUBTITLE)}
			buttonTextStub={t(Topics.STUB_EDIT_TOPIC_SUBMIT)}
		>
			<TopicEditForm topic={topic} />
		</AuthorEditRestriction>
	) : null;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasTopic}
			stubs={stubs}
			content={content}
			roles={['admin', 'author']}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TopicEditPage;
