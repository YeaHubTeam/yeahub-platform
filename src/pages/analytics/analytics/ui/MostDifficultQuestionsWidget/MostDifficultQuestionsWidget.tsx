import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics, ROUTES } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetMostDifficultQuestionsBySpecializationIdQuery } from '@/entities/question';

import {
	ITEMS_COUNT_DESKTOP,
	ITEMS_COUNT_MOBILE,
} from '../../lib/constants/mostDifficultQuestions';
import { MostDifficultQuestionItem } from '../MostDifficultQuestionItem/MostDifficultQuestionItem';

import styles from './MostDifficultQuestionsWidget.module.css';
import { MostDifficultQuestionsWidgetSkeleton } from './MostDifficultQuestionsWidget.skeleton';

export const MostDifficultQuestionsWidget = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = useAppSelector(getSpecializationId);

	const { data: difficultQuestions, isLoading } =
		useGetMostDifficultQuestionsBySpecializationIdQuery({
			specId: specializationId,
			limit: ITEMS_COUNT_DESKTOP,
			page: 1,
		});

	const { isSmallScreen } = useScreenSize();

	const mixedQuestions =
		difficultQuestions && [...difficultQuestions.data.topStat].sort(() => Math.random() - 0.5);

	const filteredQuestions = isSmallScreen
		? mixedQuestions?.slice(0, ITEMS_COUNT_MOBILE)
		: mixedQuestions?.slice(0, ITEMS_COUNT_DESKTOP);

	if (isLoading) return <MostDifficultQuestionsWidgetSkeleton />;

	return (
		<Card
			className={styles.card}
			title={`${t(Analytics.MOST_DIFFICULT_QUESTIONS_TITLE_WIDGET)} ${difficultQuestions?.data.specialization.title}`}
			actionRoute={ROUTES.analytics['difficult-questions'].page}
			isActionPositionBottom
		>
			<Flex direction="column" gap="12">
				{filteredQuestions?.map((question) => (
					<MostDifficultQuestionItem key={question.questionId} question={question} />
				))}
			</Flex>
		</Card>
	);
};
