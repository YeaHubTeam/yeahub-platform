import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Vacancy } from '@/entities/vacancy';

interface VacancySkillsProps {
	skills: Vacancy['skills'];
}

export const VacancySkills = ({ skills }: VacancySkillsProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	if (!skills.length) return null;

	return (
		<Flex gap="20" direction="column">
			<Text variant="body5-accent" color="black-900">
				{t(Vacancies.SKILLS_TITLE)}
			</Text>
			<Flex wrap="wrap" gap="12" componentType="ul">
				{skills.map(({ id, title }) => (
					<li key={id}>
						<Chip label={title} /> {/*disablePointer /> */}
					</li>
				))}
			</Flex>
		</Flex>
	);
};
