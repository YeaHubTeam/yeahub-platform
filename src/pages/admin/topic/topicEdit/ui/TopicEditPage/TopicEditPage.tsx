import { useParams } from 'react-router-dom';

import { useGetTopicByIdQuery } from '@/entities/topic';

import { TopicEditForm } from '@/features/topics/editTopic';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const TopicEditPage = () => {
	const { topicId } = useParams<{ topicId: string }>();

	const { data: topic, isLoading, isError, refetch } = useGetTopicByIdQuery(topicId || '');

	const hasTopic = topic && Object.keys(topic).length > 0;

	const content = hasTopic ? <TopicEditForm topic={topic} /> : null;

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
