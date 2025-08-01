import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { QuizResultModal } from '@/widgets/Landing/QuizResultModal/ui/QuizResultModal/QuizResultModal';

import styles from './QuizResultButton.module.css';

export const QuizResultButton = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const { isOpen, onOpen, onClose } = useModal();

	return (
		<>
			<Button
				variant="link"
				className={styles.button}
				suffix={<Icon icon="arrowRight" className={styles.icon} />}
				onClick={onOpen}
			>
				{t(InterviewQuizResult.INTERVIEW_STATISTIC_LINK)}
			</Button>
			<QuizResultModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};
