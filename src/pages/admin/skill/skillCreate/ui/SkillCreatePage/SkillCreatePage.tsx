import { SkillCreateForm } from '@/features/skill/createSkill';

import { PageWrapper } from '@/widgets/PageWrapper';

const SkillCreatePage = () => {
	const content = <SkillCreateForm />;

	return (
		<PageWrapper hasData roles={['admin', 'author']} stubs={{}} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default SkillCreatePage;
