import { i18Namespace } from '@/shared/config/i18n';
import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Skill } from '../../model/types/skill';

import styles from './SkillCard.module.css';

interface SkillCardProps {
	skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
	const { t } = useI18nHelpers(i18Namespace.skill);

	return (
		<Flex direction="column" gap="24" className={styles.wrap}>
			<Card>
				<Flex gap="16">
					<img src={skill.imageSrc} alt="" className={styles['card-image']} />
					<h2>{skill.title}</h2>
				</Flex>
			</Card>

			<Card>
				<Flex direction="column" gap="20">
					<h3>{t(Skills.DESCRIPTION)}</h3>
					<p>{skill.description}</p>
				</Flex>
			</Card>
		</Flex>
	);
};
