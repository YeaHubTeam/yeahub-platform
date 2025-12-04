import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuiz } from '@/shared/config';
import { Modal } from '@/shared/ui/Modal';

interface ResetActiveQuizModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOk: () => void;
}

const ResetActiveQuizModal = ({ isOpen, onClose, onOk }: ResetActiveQuizModalProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t(InterviewQuiz.MODAL_CLONE_QUIZ_CONFIRM_TITLE)}
			buttonPrimaryText={t(InterviewQuiz.MODAL_CLONE_QUIZ_CONFIRM_ACTIONS_OK)}
			buttonOutlineText={t(InterviewQuiz.MODAL_CLONE_QUIZ_CONFIRM_ACTIONS_CANCEL)}
			buttonPrimaryClick={onOk}
			buttonOutlineClick={onClose}
		>
			{t(InterviewQuiz.MODAL_CLONE_QUIZ_CONFIRM_DESCRIPTION)}
		</Modal>
	);
};

export default ResetActiveQuizModal;
