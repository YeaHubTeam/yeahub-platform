import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Skills } from '@/shared/config';

import { useGetSkillByIdQuery } from '@/entities/skill';

import { SkillEditForm } from '@/features/skill/editSkill';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const SkillEditPage = () => {
	const { t } = useTranslation(i18Namespace.skill);
	const { skillId } = useParams<{ skillId: string }>();

	const { data: skill, isLoading, isError, refetch } = useGetSkillByIdQuery({ skillId: skillId! });

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = skill ? (
		<EditAccessGuard
			authorId={skill.createdBy?.id}
			redirectTo={ROUTES.admin.skills.page}
			titleStub={t(Skills.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(Skills.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(Skills.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<SkillEditForm skill={skill} />
		</EditAccessGuard>
	) : null;

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
