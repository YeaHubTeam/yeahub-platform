import { Card } from '@/shared/ui/Card';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { FinishedTestAnswer, FinishedTestQuestion } from '@/entities/test';

import styles from './TestResultQuestionsList.module.css';

interface TestResultQuestionsListProps {
	questions: FinishedTestQuestion[];
	fullCount: number;
	answers: FinishedTestAnswer[];
}

export const TestResultQuestionsList = ({
	questions,
	fullCount,
	answers,
}: TestResultQuestionsListProps) => {
	return (
		<Card title={`Пройденные тесты · ${fullCount}`}>
			<Flex direction="column" gap="16">
				{questions.map((question: FinishedTestQuestion) => {
					const userAnswer = answers.find((ans) => ans.questionId === question.id);
					const userSelectedKeys = userAnswer?.answer ?? [];
					return (
						<Card key={question.id} title={question.title} withOutsideShadow>
							<Flex direction="column" gap="8">
								{Object.entries(question.variants).map(([key, text]) => {
									const isSuccess = question.successVariants.includes(key);
									const isSelected = userSelectedKeys.includes(key);
									const isWrongUserChoice = isSelected && !isSuccess;

									let variantClass = styles.neutral;
									if (isSuccess) {
										variantClass = styles.success;
									} else if (isWrongUserChoice) {
										variantClass = styles.error;
									}

									return (
										<div key={key} className={`${styles.variant} ${variantClass}`}>
											<Flex align="center" gap="8">
												<Checkbox checked={isSelected} aria-readonly />

												<Text variant="body2">
													{text}
													{isSuccess && ' — правильный ответ'}
													{isWrongUserChoice && ' — ваш ответ'}
												</Text>
											</Flex>
										</div>
									);
								})}
							</Flex>
						</Card>
					);
				})}
			</Flex>
		</Card>
	);
};
