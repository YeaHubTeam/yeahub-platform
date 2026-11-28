import { TopicCreateForm } from '@/features/topic/createTopic';

import { PageWrapper } from '@/widgets/PageWrapper';

const TopicCreatePage = () => {
	const content = <TopicCreateForm />;

	return (
		<PageWrapper hasData roles={['admin', 'author']} stubs={{}} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TopicCreatePage;
