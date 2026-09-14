import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import type { VacancyMarketTopItem } from '@/entities/vacancy';

import styles from './VacancyMarketSkills.module.css';

interface VacancyMarketSkillsProps {
	skills: VacancyMarketTopItem[];
	title: string;
}

const TOP_SKILLS_LIMIT = 5;

const roundPercent = (percent: number): number => Math.ceil(percent);

export const VacancyMarketSkills = ({ skills, title }: VacancyMarketSkillsProps) => {
	const visibleSkills = skills.slice(0, TOP_SKILLS_LIMIT);

	return (
		<Flex componentType="section" direction="column" gap="12">
			<Text variant="body3-accent" color="black-500">
				{title}
			</Text>

			<Flex direction="column" gap="8">
				{visibleSkills.map((skill, index) => {
					const displayedPercent = roundPercent(skill.percent);

					return (
						<div key={`${skill.title}-${index}`}>
							<Flex justify="between" align="center" gap="8">
								<Text variant="body2">{skill.title}</Text>
								<Text variant="body2">{displayedPercent}%</Text>
							</Flex>

							<ProgressBar
								className={styles.progress}
								currentCount={displayedPercent}
								totalCount={100}
								variant="medium"
								color="purple"
							/>
						</div>
					);
				})}
			</Flex>
		</Flex>
	);
};
