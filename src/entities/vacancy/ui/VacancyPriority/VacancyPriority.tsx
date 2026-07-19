import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { VacancyAiProfile } from '@/entities/vacancy';

import styles from './VacancyPriority.module.css';

interface VacancyPriorityProps {
	prioritySkills: VacancyAiProfile['extra'];
}

export const VacancyPriority = ({ prioritySkills }: VacancyPriorityProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	if (!prioritySkills) return null;

	return (
		<Flex gap="20" direction="column">
			<Flex gap="8">
				<Icon icon="pin" color="purple-700" size={24} />
				<Text variant="body5-accent" color="black-900">
					{t(Vacancies.PRIORITY_TITLE)}
				</Text>
			</Flex>
			<Flex gap="12" direction="column" componentType="ul" className={styles['skills-list']}>
				{prioritySkills.map(({ key, value }) => (
					<li key={key} className={styles.skill}>
						<Text variant="body3-accent" color="black-900">
							{value}
						</Text>
					</li>
				))}
			</Flex>
		</Flex>
	);
};
