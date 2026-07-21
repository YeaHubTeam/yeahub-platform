import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, InterviewQuizResult } from '@/shared/config';
import { SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import styles from './QuizResultUpgradeButton.module.css';

export const QuizResultUpgradeButton = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);
	const navigate = useNavigate();

	return (
		<Button
			variant="link"
			className={styles.button}
			suffix={<Icon icon="arrowRight" className={styles.icon} />}
			onClick={() => navigate(SELECT_TARIFF_SETTINGS_TAB)}
		>
			{t(InterviewQuizResult.INTERVIEW_STATISTIC_LINK)}
		</Button>
	);
};
