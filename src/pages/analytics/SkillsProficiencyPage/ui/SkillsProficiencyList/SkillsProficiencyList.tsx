import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { LearnedQuestion } from '@/entities/question';

import styles from './SkillsProficiencyList.module.css';

type SkillsProficiencyListProps = {
	learnedQuestions: LearnedQuestion[];
};

export const SkillsProficiencyList = ({ learnedQuestions }: SkillsProficiencyListProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	return (
		<ul className={styles['learned-questions']}>
			{learnedQuestions.map((learnedQuestion) => (
				<li key={learnedQuestion.id}>
					<Flex gap="12" direction="column" className={styles['learned-question']}>
						<Flex>
							<StatusChip
								status={{
									text: `${learnedQuestion.total} ${t(Analytics.SKILL_PROFICIENCY_COLUMN_QUESTIONS_TOTAL)}`,
									variant: 'green',
								}}
							/>
						</Flex>
						<Text
							variant={'body3-accent'}
						>{`${learnedQuestion.specialization.title} - ${learnedQuestion.skill.title}`}</Text>
						<Flex justify="between">
							<Text variant={'body3-accent'}>
								{t(Analytics.SKILL_PROFICIENCY_COLUMNS_LEARNED_PERCENTAGE)}
							</Text>
							<Text variant={'body3-accent'}>{`${learnedQuestion.learnedPercentage}%`}</Text>
						</Flex>
					</Flex>
				</li>
			))}
		</ul>
	);
};
