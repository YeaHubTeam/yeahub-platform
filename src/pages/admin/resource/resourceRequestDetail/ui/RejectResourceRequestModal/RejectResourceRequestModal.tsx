import { useTranslation } from 'react-i18next';

import { i18Namespace, ResourceRequests } from '@/shared/config';
import { Modal } from '@/shared/ui/Modal';

interface RejectResourceRequestModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOk: () => void;
}

export const RejectResourceRequestModal = ({
	isOpen,
	onClose,
	onOk,
}: RejectResourceRequestModalProps) => {
	const { t } = useTranslation(i18Namespace.resources);
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t(ResourceRequests.MODAL_RESOURCE_REJECT_REQUEST_TITLE)}
			buttonPrimaryText={t(ResourceRequests.MODAL_RESOURCE_REJECT_REQUEST_BUTTON_OK)}
			buttonOutlineText={t(ResourceRequests.MODAL_RESOURCE_REJECT_REQUEST_BUTTON_CANCEL)}
			buttonPrimaryClick={onOk}
			buttonOutlineClick={onClose}
		>
			{t(ResourceRequests.MODAL_RESOURCE_REJECT_REQUEST_MESSAGE)}
		</Modal>
	);
};
