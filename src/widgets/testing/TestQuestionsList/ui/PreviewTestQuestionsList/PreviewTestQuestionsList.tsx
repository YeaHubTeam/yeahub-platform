import { useTranslation } from 'react-i18next';

import { i18Namespace, ROUTES, TestQuestions } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getSpecializationId } from '@/entities/profile';
import { PreviewTestQuestionsItem, useGetTestQuestionsListQuery } from '@/entities/testQuestion';

import styles from './PreviewTestQuestionsList.module.css';

export interface PreviewTestQuestionsListProps {
	className?: string;
}

export const PreviewTestQuestionsList = ({ className }: PreviewTestQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.testQuestion);

	const specializationId = useAppSelector(getSpecializationId);

	const { data: response, isSuccess } = useGetTestQuestionsListQuery({
		random: true,
		limit: 3,
		specializationId,
	});

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	return (
		<Card
			className={className}
			title={t(TestQuestions.PREVIEW_TITLE)}
			actionTitle={t(TestQuestions.PREVIEW_LINK)}
			actionDisabled={isEmptyData}
			actionRoute={ROUTES.wiki.testQuestions.page}
		>
			{isEmptyData ? (
				<Text variant="body4" color="black-700" className={styles['no-questions']}>
					{t(TestQuestions.PREVIEW_EMPTY_SPECIALIZATION)}
				</Text>
			) : (
				<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
					{questions.map((question) => (
						<PreviewTestQuestionsItem
							key={question.id}
							title={question.title}
							questionId={question.id}
							rate={question.rate}
							complexity={question.complexity}
							imageSrc={question.questionSkills[0].imageSrc ?? undefined}
						/>
					))}
				</Flex>
			)}
		</Card>
	);
};
