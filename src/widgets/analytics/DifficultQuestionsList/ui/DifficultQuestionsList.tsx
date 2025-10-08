import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import { getSpecializationId } from '@/entities/profile';
import { MostDifficultQuestions } from '@/entities/question/mostDifficultQuestions';

import styles from './DifficultQuestionsList.module.css';

export const DifficultQuestionsList = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const specializationId = useAppSelector(getSpecializationId);

	return (
		<Card
			className={styles.card}
			title="Топ самых сложных вопросов Python"
			actionTitle={t(Questions.MORE)}
			actionRoute="/"
			isActionPositionBottom
		>
			<MostDifficultQuestions specializationId={specializationId} />
		</Card>
	);
};
