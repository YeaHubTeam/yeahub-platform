import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { Modal } from '@/shared/ui/Modal';

interface ConfirmInterruptQuizModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOk: () => void;
}

const ConfirmInterruptQuizModal = ({ isOpen, onClose, onOk }: ConfirmInterruptQuizModalProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t(InterviewQuiz.MODAL_INTERRUPT_QUIZ_TITLE)}
			buttonPrimaryText={t(InterviewQuiz.MODAL_INTERRUPT_QUIZ_YES)}
			buttonOutlineText={t(InterviewQuiz.MODAL_INTERRUPT_QUIZ_NO)}
			buttonPrimaryClick={onOk}
			buttonOutlineClick={onClose}
		>
			{t(InterviewQuiz.MODAL_INTERRUPT_QUIZ_DESCRIPTION)}
		</Modal>
	);
};

export default ConfirmInterruptQuizModal;
