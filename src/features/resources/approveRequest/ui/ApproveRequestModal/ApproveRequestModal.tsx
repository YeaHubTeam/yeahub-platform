import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { Modal } from '@/shared/ui/Modal';

interface ApproveRequestModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOk: () => void;
}

export const ApproveRequestModal = ({ isOpen, onClose, onOk }: ApproveRequestModalProps) => {
	const { t } = useTranslation(i18Namespace.resources);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t(ResourceRequests.MODAL_RESOURCE_APPROVE_REQUEST_TITLE)}
			buttonPrimaryText={t(ResourceRequests.MODAL_RESOURCE_APPROVE_REQUEST_BUTTON_OK)}
			buttonOutlineText={t(ResourceRequests.MODAL_RESOURCE_APPROVE_REQUEST_BUTTON_CANCEL)}
			buttonPrimaryClick={onOk}
			buttonOutlineClick={onClose}
		>
			{t(ResourceRequests.MODAL_RESOURCE_APPROVE_REQUEST_MESSAGE)}
		</Modal>
	);
};
