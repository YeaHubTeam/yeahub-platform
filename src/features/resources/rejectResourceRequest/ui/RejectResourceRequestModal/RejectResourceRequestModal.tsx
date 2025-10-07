import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
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
			buttonPrimaryText={t(ResourceRequests.REJECT_MODAL_TITLE_YES)}
			buttonOutlineText={t(ResourceRequests.REJECT_MODAL_TITLE_NO)}
			buttonPrimaryClick={onOk}
			buttonOutlineClick={onClose}
		>
			<div>{t(ResourceRequests.REJECT_MODAL_TEXT)}</div>
		</Modal>
	);
};
