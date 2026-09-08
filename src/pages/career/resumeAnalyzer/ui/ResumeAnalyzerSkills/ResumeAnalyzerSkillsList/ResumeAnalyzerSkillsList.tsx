import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { ProgressBar, ProgressBarColor } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import styles from './ResumeAnalyzerSkillsList.module.css';

type Skills = {
	title: string;
	percent: number;
};

interface ResumeAnalyzerSkillsListProps {
	title: string;
	skills: Skills[];
	color?: ProgressBarColor;
}

export const ResumeAnalyzerSkillsList = ({
	title,
	skills,
	color,
}: ResumeAnalyzerSkillsListProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { t } = useTranslation(i18Namespace.translation);
	const displayedSkills = isExpanded ? skills : skills.slice(0, 8);

	return (
		<Flex direction="column" gap="12">
			<Text variant="body3-accent">{title}</Text>
			{displayedSkills.map((skill, index) => (
				<Flex key={`${skill.title}-${index}`} direction="column">
					<Flex justify="between">
						<Text variant="body3-accent">{skill.title}</Text>
						<Text variant="body3-accent">{Math.round(skill.percent)}%</Text>
					</Flex>
					<ProgressBar
						currentCount={skill.percent}
						totalCount={100}
						className={color ? '' : styles['progress-bar']}
						variant="medium"
						color={color}
					/>
				</Flex>
			))}
			{skills.length > 8 && (
				<Button
					variant="link"
					size="medium"
					suffix={
						<Icon
							icon="arrowShortDown"
							size={24}
							color="purple-700"
							className={isExpanded ? styles.icon : undefined}
						/>
					}
					onClick={() => setIsExpanded((val) => !val)}
					className={styles.button}
				>
					{isExpanded ? `${t(Translation.HIDE)}` : `${t(Translation.SHOW_ALL)}`}
				</Button>
			)}
		</Flex>
	);
};
