import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';

import { MostDifficultQuestions } from '@/entities/mostDifficultQuestions';

import styles from './DifficultQuestionsList.module.css';

export const DifficultQuestionsList = () => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<Card
			className={styles.card}
			title="Топ самых сложных вопросов Python"
			actionTitle={t(Questions.MORE)}
			actionRoute="/"
			isActionPositionBottom
		>
			<MostDifficultQuestions />
		</Card>
	);
};
