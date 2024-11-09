import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { SkillCard, useGetSkillByIdQuery } from '@/entities/skill';

import { DeleteSkillButton } from '@/features/skill/deleteSkill';

/**
 * Page showing detail info about a single skill
 * @constructor
 */
const SkillDetailPage = () => {
	const { t } = useI18nHelpers(i18Namespace.translation);
	const { skillId } = useParams<{ skillId: string }>();
	const { data: skill } = useGetSkillByIdQuery(skillId as string);

	if (!skill) {
		return null;
	}

	return (
		<main>
			<Flex align="center" gap="8" style={{ marginBottom: 34, justifyContent: 'space-between' }}>
				<BackButton />

				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
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
