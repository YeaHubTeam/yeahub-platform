import { CollectionCreateForm } from '@/features/collections/createCollection';
import { CollectionCreateFormSkeleton } from '@/features/collections/createCollection';

import { PageWrapper } from '@/widgets/PageWrapper';

const CollectionCreatePage = () => {
	return (
		<PageWrapper
			roles={['admin', 'author']}
			hasData
			stubs={{}}
			skeleton={<CollectionCreateFormSkeleton />}
			content={<CollectionCreateForm />}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CollectionCreatePage;
