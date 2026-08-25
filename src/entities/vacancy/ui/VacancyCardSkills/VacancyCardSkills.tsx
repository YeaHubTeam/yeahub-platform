import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { MAX_SHOW_LIMIT_SKILLS } from '../../model/constants/vacancy';
import type { VacancySkill } from '../../model/types/vacancy';

import styles from './VacancyCardSkills.module.css';

interface VacancyCardCompanyProps {
	skills: VacancySkill[];
}

export const VacancyCardSkills = ({ skills }: VacancyCardCompanyProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const visibleSkills = skills.slice(0, MAX_SHOW_LIMIT_SKILLS);
	const hiddenSkillsCount = skills.length - MAX_SHOW_LIMIT_SKILLS;

	return (
		<Flex gap="10" align="center" wrap="wrap">
			{visibleSkills.map(({ id, title }) => (
				<Card withOutsideShadow className={styles.skills} key={id}>
					<Text variant="body1-accent" className={styles.skill}>
						{title}
					</Text>
				</Card>
			))}
			{hiddenSkillsCount > 0 && (
				<Tooltip
					title={skills
						.slice(MAX_SHOW_LIMIT_SKILLS)
						.map(({ title }) => title)
						.join(', ')}
				>
					<Text variant="body3" color="black-400">
						{t(Vacancies.COUNT_SKILLS, { count: hiddenSkillsCount })}
					</Text>
				</Tooltip>
			)}
		</Flex>
	);
};
