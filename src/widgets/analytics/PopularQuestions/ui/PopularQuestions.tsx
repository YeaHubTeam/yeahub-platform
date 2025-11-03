import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import { getSpecializationId } from '@/entities/profile';
import {
	PopularQuestionsSpecialization,
	PreviewQuestionsItem,
	useGetPopularQuestionsQuery,
} from '@/entities/question';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import styles from './PopularQuestions.module.css';

export const PopularQuestions = () => {
	const { data, isLoading } = useGetPopularQuestionsQuery();
	const specializationId = useAppSelector(getSpecializationId) || DEFAULT_SPECIALIZATION_ID;

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.analytics]);
	const currentSpecializationData =
		data?.find(
			(question: PopularQuestionsSpecialization) => question.specializationId === specializationId,
		) ?? data?.[0];
	const popularQuestions = currentSpecializationData?.topStat?.slice(0, 3) || [];

	return (
		<Card
			className={styles['popular-questions-card']}
			size="medium"
			title={t(Analytics.POPULAR_QUESTIONS_TITLE, { ns: i18Namespace.analytics })}
			actionTitle={t(Translation.CRUMBS_QUESTION_DETAIL, { ns: i18Namespace.translation })}
			actionRoute="/"
			isActionPositionBottom
		>
			{isLoading && null}
			{!isLoading && (
				<>
					{popularQuestions.map((question) => (
						<PreviewQuestionsItem
							key={question.questionId}
							questionId={question.questionId}
							title={question.title}
							frequency={question.frequencyStat}
							imageSrc={question.imageSrc}
						/>
					))}
				</>
			)}
		</Card>
	);
};
