import { useTranslation } from 'react-i18next';

import { i18Namespace, TestQuestions } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TestQuestion } from '@/entities/testQuestion';

import { TestQuestionAdditionalInfo } from '../TestQuestionAdditionalInfo/TestQuestionAdditionalInfo';

import styles from './TestQuestionPageContent.module.css';

interface TestQuestionPageContentProps {
	question: TestQuestion;
}

export const TestQuestionPageContent = ({ question }: TestQuestionPageContentProps) => {
	const { t } = useTranslation(i18Namespace.testQuestion);
	const variants = Object.entries(question.variants ?? {});

	return (
		<div className={styles.layout}>
			<Flex direction="column" gap="20" className={styles.main}>
				<Card withOutsideShadow className={styles['question-card']}>
					<Flex direction="column" gap="20">
						<Text variant="head3" isMainTitle className={styles.title}>
							{question.title}
						</Text>
						<Text variant="body3-accent" className={styles.description}>
							{question.description}
						</Text>
					</Flex>
				</Card>
				<Card
					titleComponent={<Text variant="body6">{t(TestQuestions.ANSWERS_TITLE)}</Text>}
					withOutsideShadow
					className={styles['answer-card']}
				>
					<Flex direction="column" gap="20">
						{variants.map(([key, answer]) => (
							<Checkbox
								key={key}
								label={answer}
								checked={question.successVariants?.includes(key) ?? false}
								disabled
								className={styles.answer}
							/>
						))}
						{variants.length === 0 && <Text variant="body3">{t(TestQuestions.ANSWERS_EMPTY)}</Text>}
						{variants.length > 0 && !question.successVariants?.length && (
							<Text variant="body2" color="black-700">
								{t(TestQuestions.ANSWERS_UNAVAILABLE)}
							</Text>
						)}
					</Flex>
				</Card>
			</Flex>
			<TestQuestionAdditionalInfo question={question} />
		</div>
	);
};
