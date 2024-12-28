import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';

import { mockTraining } from './mockTraining';
import styles from './QuestionList.module.css';

const mockQuestionList = mockTraining.slice(0, 4);

export const QuestionList = () => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<ul className={styles['question-list']}>
			{mockQuestionList.map((training) => (
				<li className={styles['question-item']} key={training.id}>
					<img src={training.image} alt="question" width={71} height={51} loading="lazy" />
					<p>{training.title}</p>
					<div>
						<p>
							{t(Questions.RATE_TITLE_SHORT)}:<span>{training.rating}</span>
						</p>
						<p className={styles.difficulty}>
							{t(Questions.COMPLEXITY_TITLE_SHORT)}:<span>{training.difficulty}</span>
						</p>
					</div>
				</li>
			))}
		</ul>
	);
};
