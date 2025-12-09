import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, Translation, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { SkillCard, useGetSkillByIdQuery } from '@/entities/skill';

import { DeleteSkillButton } from '@/features/skill/deleteSkill';

const SkillDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { skillId } = useParams<{ skillId: string }>();
	const { data: skill } = useGetSkillByIdQuery({ skillId: skillId! });

	if (!skill) {
		return null;
	}

	return (
		<main>
			<Flex align="center" justify="between" gap="8" style={{ marginBottom: 34 }}>
				<BackButton />

				<Flex gap="16">
					<DeleteSkillButton skillId={skill.id} isDetailPage />
					<NavLink to={route(ROUTES.admin.skills.edit.page, skill.id)}>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>
			<SkillCard skill={skill} />
		</main>
	);
};

export default SkillDetailPage;
