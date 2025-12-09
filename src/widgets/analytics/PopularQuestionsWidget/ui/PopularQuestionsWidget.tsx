import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics, Translation, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { PreviewQuestionsItem, useGetPopularQuestionsQuery } from '@/entities/question';

import { ITEMS_COUNT } from '../model/constants';

import { PopularQuestionsWidgetSkeleton } from './PopularQuestionsWidget.skeleton';

export const PopularQuestionsWidget = () => {
	const { data, isLoading } = useGetPopularQuestionsQuery();
	const specializationId = useAppSelector(getSpecializationId);

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.analytics]);
	const currentSpecializationData =
		data?.find((question) => question.specializationId === specializationId) ?? data?.[0];
	const popularQuestions = currentSpecializationData?.topStat?.slice(0, ITEMS_COUNT) || [];

	if (isLoading) return <PopularQuestionsWidgetSkeleton />;

	return (
		<Card
			size="medium"
			title={t(Analytics.POPULAR_QUESTIONS_TITLE, { ns: i18Namespace.analytics })}
			actionTitle={t(Translation.CRUMBS_QUESTION_DETAIL, { ns: i18Namespace.translation })}
			actionRoute={ROUTES.analytics['popular-questions'].route}
			isActionPositionBottom
		>
			<Flex direction="column" gap="12">
				{popularQuestions.map((question) => (
					<PreviewQuestionsItem
						key={question.questionId}
						questionId={question.questionId}
						title={question.title}
						frequency={question.frequencyStat}
						imageSrc={question.imageSrc}
					/>
				))}
			</Flex>
		</Card>
	);
};
