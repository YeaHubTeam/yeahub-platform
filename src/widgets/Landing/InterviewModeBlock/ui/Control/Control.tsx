import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { DislikeIcon } from '@/shared/ui/Icons/DislikeIcon';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon';

import styles from './Control.module.css';

export const Control = () => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	return (
		<div className={styles.control}>
			<ul className={styles['control-list']}>
				<li>
					<DislikeIcon />
					<span>{t(InterviewQuiz.ANSWER_DO_NOT_KNOW)}</span>
				</li>
				<li>
					<LikeIcon />
					<span>{t(InterviewQuiz.ANSWER_KNOW)}</span>
				</li>
			</ul>
		</div>
	);
};
