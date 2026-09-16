import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Skills } from '@/shared/config';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { useCanManageAdminEntity } from '@/entities/profile';
import { SkillCard, useGetSkillByIdQuery } from '@/entities/skill';

import { useDeleteSkillMutation } from '@/features/skill/deleteSkill';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const SkillDetailPage = () => {
	const { t: tSkill } = useTranslation(i18Namespace.skill);
	const { skillId } = useParams<{ skillId: string }>();

	const { data: skill, isLoading, isError, refetch } = useGetSkillByIdQuery({ skillId: skillId! });
	const [deleteSkill] = useDeleteSkillMutation();
	const canManage = useCanManageAdminEntity({ ownerId: skill?.createdBy?.id });

	const handleDeleteSkill = () => {
		if (skill) {
			void deleteSkill(skill.id);
		}
	};

	const isSkillEmpty = !skill || Object.keys(skill).length === 0;

	const stubs: PageWrapperStubs = {
		empty: {
			title: tSkill(Skills.STUB_EMPTY_SKILL_TITLE),
			subtitle: tSkill(Skills.STUB_EMPTY_SKILL_SUBTITLE),
			buttonText: tSkill(Skills.STUB_EMPTY_SKILL_SUBMIT),
			onClick: refetch,
		},
		error: {
			onClick: refetch,
		},
	};

	const content = !isSkillEmpty ? (
		<>
			<HeaderAdminPageDetailCard onDelete={handleDeleteSkill} isDisabled={!canManage} />
			<SkillCard skill={skill} />
		</>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={!isSkillEmpty}
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default SkillDetailPage;
