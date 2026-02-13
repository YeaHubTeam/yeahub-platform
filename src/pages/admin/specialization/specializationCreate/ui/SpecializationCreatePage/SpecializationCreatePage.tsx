import { SpecializationCreateForm } from '@/features/specialization/createSpecialization';

import { PageWrapper } from '@/widgets/PageWrapper';

const SpecializationCreatePage = () => {
	const content = <SpecializationCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default SpecializationCreatePage;
