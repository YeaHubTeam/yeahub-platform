import { Card } from '@/shared/ui/Card';

import { MostDifficultQuestions } from '@/entities/mostDifficultQuestions';

import styles from './DifficultQuestionsList.module.css';

export const DifficultQuestionsList = () => {
	return (
		<Card
			className={styles.card}
			title="Топ самых сложных вопросов Python"
			actionTitle="Подробнее"
			actionRoute="/"
			isActionPositionBottom
		>
			<MostDifficultQuestions />
		</Card>
	);
};
