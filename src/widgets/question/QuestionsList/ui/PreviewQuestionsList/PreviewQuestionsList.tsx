import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getSpecializationId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';
import { PreviewQuestionsItem } from '@/entities/question';

import styles from './PreviewQuestionsList.module.css';

export interface PreviewQuestionsListProps {
	className?: string;
}

export const PreviewQuestionsList = ({ className }: PreviewQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const specializationId = useAppSelector(getSpecializationId);

	const { data: response, isSuccess } = useGetQuestionsListQuery({
		random: true,
		limit: 3,
		specialization: specializationId,
	});

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	return (
		<Card
			className={className}
			title={t(Questions.PREVIEW_TITLE)}
			actionTitle={t(Questions.PREVIEW_LINK)}
			actionDisabled={isEmptyData}
			actionRoute={ROUTES.wiki.questions.page}
		>
			{isEmptyData ? (
				<Text variant="body4" color="black-700" className={styles['no-questions']}>
					{t(Questions.PREVIEW_EMPTY_SPECIALIZATION)}
				</Text>
			) : (
				<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
					{questions.map((question) => (
						<PreviewQuestionsItem
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
