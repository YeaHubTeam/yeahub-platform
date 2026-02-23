import { useParams } from 'react-router-dom';

import { useGetSkillByIdQuery } from '@/entities/skill';

import { SkillEditForm } from '@/features/skill/editSkill';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const SkillEditPage = () => {
	const { skillId } = useParams<{ skillId: string }>();

	const { data: skill, isLoading, isError, refetch } = useGetSkillByIdQuery({ skillId: skillId! });

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = skill ? <SkillEditForm skill={skill} /> : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={!!skill}
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default SkillEditPage;
