import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';

import { getSpecializationId } from '@/entities/profile';
import { useGetMostDifficultQuestionsBySpecializationIdQuery } from '@/entities/question';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { DifficultQuestionsList } from '../DifficultQuestionsList/DifficultQuestionsList';
import { DifficultQuestionsTable } from '../DifficultQuestionsTable/DifficultQuestionsTable';

export const DifficultQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = useAppSelector(getSpecializationId);

	const { filters, onChangeSpecialization } = useAnalyticFilters({
		specialization: specializationId,
	});

	const { data: response } = useGetMostDifficultQuestionsBySpecializationIdQuery(
		filters.specialization || specializationId,
	);

	const difficultQuestions = response?.topStat ?? [];

	return (
		<AnalyticPageTemplate
			title={
				filters.specialization
					? t(Analytics.MOST_DIFFICULT_QUESTIONS_TITLE_PAGE, {
							text: response?.specialization.title,
						})
					: t(Analytics.MOST_DIFFICULT_QUESTIONS_TITLE_PAGE_ALL)
			}
			list={<DifficultQuestionsList difficultQuestions={difficultQuestions} />}
			tooltip={t(Analytics.MOST_DIFFICULT_QUESTIONS_TOOLTIP)}
			table={<DifficultQuestionsTable difficultQuestions={difficultQuestions} />}
			filters={{
				specialization: filters.specialization,
				onChangeSpecialization,
			}}
		/>
	);
};
