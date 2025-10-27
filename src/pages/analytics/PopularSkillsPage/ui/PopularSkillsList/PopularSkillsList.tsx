import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { PopularSkill } from '@/entities/skill';

import styles from './PopularSkillsList.module.css';

interface Props {
	skill: PopularSkill;
}

export const PopularSkillsList = ({ skill }: Props) => {
	const { t } = useTranslation([i18Namespace.analytics]);

	return (
		<div className={styles.card}>
			<Text variant="body3-accent">{skill.skill.title}</Text>
			<Flex justify="between" className={styles['mobile-popularity']}>
				<Text variant="body3-accent">{t(Analytics.SKILLS_TABLE_POPULARITY)}</Text>
				<Text variant="body3-accent">{`${skill.frequencyStat}%`}</Text>
			</Flex>
		</div>
	);
};
