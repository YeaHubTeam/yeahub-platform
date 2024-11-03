import ScreenImg from '@/shared/assets/images/landing/screen.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { mockTraining } from './mockTraining';
import styles from './QuestionList.module.css';

const mockQuestionList = mockTraining.slice(0, 4);

export const QuestionList = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<ul className={styles['question-list']}>
			{mockQuestionList.map((training) => (
				<li className={styles['question-item']} key={training.id}>
					<img src={ScreenImg} alt="question" />
					<p>{training.title}</p>
					<div>
						<p>
							{t(Landing.RATING)}:<span>{training.rating}</span>
						</p>
						<p className={styles.difficulty}>
							{t(Landing.COMPLEXITY)}:<span>{training.difficulty}</span>
						</p>
					</div>
				</li>
			))}
		</ul>
	);
};
