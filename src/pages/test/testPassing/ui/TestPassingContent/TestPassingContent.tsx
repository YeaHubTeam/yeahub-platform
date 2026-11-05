import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, TestPassing } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import {
	CreateNewTestResponse,
	getActiveTestState,
	getStoredActiveTest,
	saveActiveTest,
} from '@/entities/test';

import styles from './TestPassingContent.module.css';

interface TestPassingContentProps {
	test: CreateNewTestResponse;
	profileId: string;
}

export const TestPassingContent = ({ test, profileId }: TestPassingContentProps) => {
	const { t } = useTranslation(i18Namespace.testPassing);
	const [savedAnswers, setSavedAnswers] = useState(() =>
		getActiveTestState(test, getStoredActiveTest(profileId)),
	);
	const [questionIndex, setQuestionIndex] = useState(0);
	const questions = getActiveTestState(test, savedAnswers);
	const totalCount = questions.length;
	const currentIndex = Math.min(questionIndex, totalCount - 1);
	const question = questions[currentIndex];
	const questionDetails = test.questions[currentIndex];

	if (!question) return null;

	const onToggleAnswer = (variantKey: string) => {
		const answer = question.answer.includes(variantKey)
			? question.answer.filter((key) => key !== variantKey)
			: [...question.answer, variantKey];
		const updatedAnswers = questions.map((item) =>
			item.questionId === question.questionId ? { ...item, answer } : item,
		);

		saveActiveTest(profileId, updatedAnswers, test);
		setSavedAnswers(updatedAnswers);
	};

	return (
		<Flex direction="column" gap="24" className={styles.container}>
			<Card withOutsideShadow>
				<div className={styles.progress}>
					<Text isMainTitle variant="body6">
						{t(TestPassing.TITLE)}
						{test.skills.length > 0 && ` · ${test.skills.join(', ')}`}
					</Text>
					<Text variant="body2" color="black-500">
						{currentIndex + 1}/{totalCount}
					</Text>
					<ProgressBar
						className={styles['progress-bar']}
						currentCount={currentIndex + 1}
						totalCount={totalCount}
						color="purple"
					/>
				</div>
			</Card>
			<Card withOutsideShadow>
				<Flex direction="column" gap="32">
					<Flex justify="between" gap="16">
						<Button
							variant="outline"
							preffix={<Icon icon="altArrowLeft" size={20} />}
							disabled={currentIndex === 0}
							onClick={() => setQuestionIndex(currentIndex - 1)}
						>
							{t(TestPassing.PREVIOUS)}
						</Button>
						<Button
							variant="outline"
							suffix={<Icon icon="altArrowRight" size={20} />}
							disabled={currentIndex === totalCount - 1}
							onClick={() => setQuestionIndex(currentIndex + 1)}
						>
							{t(TestPassing.NEXT)}
						</Button>
					</Flex>
					<fieldset className={styles.question}>
						<legend className={styles.title}>{question.questionTitle}</legend>
						{questionDetails.description && (
							<p className={styles.description}>{questionDetails.description}</p>
						)}
						{questionDetails.imageSrc && (
							<img className={styles.image} src={questionDetails.imageSrc} alt="" />
						)}
						<Flex direction="column" gap="16">
							{Object.entries(question.variants).map(([key, label]) => (
								<Checkbox
									key={`${question.questionId}:${key}`}
									className={classNames(styles.variant, {
										[styles.selected]: question.answer.includes(key),
									})}
									label={label}
									checked={question.answer.includes(key)}
									onChange={() => onToggleAnswer(key)}
								/>
							))}
						</Flex>
					</fieldset>
					<Flex justify="end" className={styles.footer}>
						<Button variant="destructive" disabled>
							{t(TestPassing.FINISH)}
						</Button>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
