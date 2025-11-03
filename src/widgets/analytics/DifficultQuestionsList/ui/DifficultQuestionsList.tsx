import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import { getSpecializationId } from '@/entities/profile';
import {
	MostDifficultQuestions,
	useGetMostDifficultQuestionsBySpecializationIdQuery,
} from '@/entities/question';

import styles from './DifficultQuestionsList.module.css';

export const DifficultQuestionsList = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = useAppSelector(getSpecializationId);

	const { data: difficultQuestions } =
		useGetMostDifficultQuestionsBySpecializationIdQuery(specializationId);

	return (
		<Card
			className={styles.card}
			title={`${t(Analytics.MOST_DIFFICULT_QUESTIONS_TITLE)} ${difficultQuestions?.specialization.title}`}
			actionTitle={t(Analytics.MOST_DIFFICULT_QUESTIONS_LINK_DETAIL)}
			actionRoute={ROUTES.analytics['difficult-questions'].page}
			isActionPositionBottom
		>
			<MostDifficultQuestions difficultQuestions={difficultQuestions} />
		</Card>
	);
};
