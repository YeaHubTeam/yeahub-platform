import { ResourceCreateForm } from '@/features/resources/createResource';

import { PageWrapper } from '@/widgets/PageWrapper';

const ResourceCreatePage = () => {
	const content = <ResourceCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResourceCreatePage;
