import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { Modal } from '@/shared/ui/Modal';

interface Props {
	isOpen: boolean;
	handleClose: () => void;
	handleOk: () => void;
}

const ResetActiveQuizModal = ({ isOpen, handleClose, handleOk }: Props) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			title={t(InterviewQuiz.MODAL_QUIZ_TITLE)}
			buttonPrimaryText={t(InterviewQuiz.MODAL_QUIZ_ACTIONS_OK)}
			buttonOutlineText={t(InterviewQuiz.MODAL_QUIZ_ACTIONS_CANCEL)}
			buttonPrimaryClick={handleOk}
			buttonOutlineClick={handleClose}
		>
			<p>{t(InterviewQuiz.MODAL_QUIZ_DESCRIPTION)}</p>
		</Modal>
	);
};

export default ResetActiveQuizModal;
