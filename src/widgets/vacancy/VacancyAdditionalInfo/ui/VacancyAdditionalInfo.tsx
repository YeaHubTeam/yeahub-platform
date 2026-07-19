import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import {
	VacancyEnglish,
	VacancyKeywords,
	VacancyPriority,
	VacancySkills,
	VacancyTasks,
	type Vacancy,
} from '@/entities/vacancy';

import styles from './VacancyAdditionalInfo.module.css';

interface VacancyAdditionalInfoProps {
	skills: Vacancy['skills'];
	aiProfile: Vacancy['aiProfile'];
	englishLevel: Vacancy['englishLevel'];
}

export const VacancyAdditionalInfo = ({
	skills,
	aiProfile,
	englishLevel,
}: VacancyAdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	return (
		<Card className={styles.card}>
			<Flex gap="20" direction="column">
				<Flex justify="between">
					<Flex gap="8">
						<Icon icon="starFall" color="purple-700" size={24} />
						<Text variant="body5-accent" color="black-900">
							{t(Vacancies.NEURO_FIELDS_TITLE)}
						</Text>
					</Flex>
					<StatusChip status={{ text: 'AI', variant: 'purple' }} size="medium" />
				</Flex>
				<Flex gap="40" direction="column" className={styles['sidebar-content']}>
					{aiProfile && <VacancyTasks tasks={aiProfile.tasks} />}
					<VacancyEnglish englishLevel={englishLevel} />
					<VacancySkills skills={skills} />
					{aiProfile && <VacancyKeywords keywords={aiProfile.keywords} />}
					{aiProfile && <VacancyPriority prioritySkills={aiProfile.extra} />}
				</Flex>
			</Flex>
		</Card>
	);
};
