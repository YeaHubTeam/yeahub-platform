import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import { getSpecializationId } from '@/entities/profile';
import {
	MostDifficultQuestions,
	useGetMostDifficultQuestionsBySpecializationIdQuery,
} from '@/entities/question';

import styles from './DifficultQuestionsList.module.css';

export const DifficultQuestionsList = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const specializationId = useAppSelector(getSpecializationId);

	const { data: difficultQuestions } = useGetMostDifficultQuestionsBySpecializationIdQuery({
		specId: specializationId,
	});

	return (
		<Card
			className={styles.card}
			title={`${t(Questions.MOST_DIFFICULT_QUESTIONS_TITLE)} ${difficultQuestions?.specialization.title}`}
			actionTitle={t(Questions.MORE)}
			actionRoute="/"
			isActionPositionBottom
		>
			<MostDifficultQuestions difficultQuestions={difficultQuestions} />
		</Card>
	);
};
