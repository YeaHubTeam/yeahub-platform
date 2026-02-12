import { CompanyCreateForm } from '@/features/company/createCompany';

import { PageWrapper } from '@/widgets/PageWrapper';

const CompanyCreatePage = () => {
	const content = <CompanyCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CompanyCreatePage;
