import { TopicCreateForm } from '@/features/topics/createTopics';

import { PageWrapper } from '@/widgets/PageWrapper';

const TopicCreatePage = () => {
	const content = <TopicCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TopicCreatePage;
