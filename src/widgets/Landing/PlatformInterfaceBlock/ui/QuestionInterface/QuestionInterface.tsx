import { useTranslation } from 'react-i18next';

import DotsVertical from '@/shared/assets/icons/DotsVertical.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing, Questions } from '@/shared/config/i18n/i18nTranslations';
import { ChevronUp } from '@/shared/ui/Icons/ChevronUp';
import { PencilIcon } from '@/shared/ui/Icons/PencilIcon';

import styles from './QuestionInterface.module.css';

export const QuestionInterface = () => {
	const { t } = useTranslation([i18Namespace.landing, i18Namespace.questions]);

	return (
		<div className={styles['question-interface']}>
			<div className={styles.caption}>
				<PencilIcon />
				<p>
					{t(Landing.READY_INTERVIEW_ADVANTAGES_FIRST)} <br />
				</p>
			</div>
			<div className={styles['question-example']}>
				<DotsVertical className={styles['dots-icon']} />
				<ChevronUp className={styles['chevron-icon']} />
				<h3 className={styles.question}>{t(Landing.QUESTIONS_SECOND_TITLE)}</h3>
				<div className={styles['question-body']}>
					<div className={styles['question-info']}>
						<div className={styles['question-tag']}>
							{t(Questions.RATE_TITLE_SHORT, { ns: i18Namespace.questions })}: <span>4</span>
						</div>
						<div className={styles['question-tag']}>
							{t(Questions.COMPLEXITY_TITLE_SHORT, { ns: i18Namespace.questions })}: <span>10</span>
						</div>
					</div>
					<div
						className={styles.answer}
						dangerouslySetInnerHTML={{ __html: t(Landing.QUESTIONS_SECOND_ANSWER) }}
					></div>
				</div>
			</div>
		</div>
	);
};
