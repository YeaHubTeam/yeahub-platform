import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { SkillCard, useGetSkillByIdQuery } from '@/entities/skill';

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
			<Flex align="center" gap="8" style={{ marginBottom: 34 }}>
				<BackButton />
				<NavLink style={{ marginLeft: 'auto' }} to="edit">
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
			</Flex>
			<SkillCard skill={skill} />
		</main>
	);
};

export default SkillDetailPage;
