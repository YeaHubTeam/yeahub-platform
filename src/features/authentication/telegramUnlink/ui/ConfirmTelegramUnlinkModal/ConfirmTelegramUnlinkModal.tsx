import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Modal } from '@/shared/ui/Modal';

interface ConfirmTelegramUnlinkModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOk: () => void;
}

const ConfirmTelegramUnlinkModal = ({ isOpen, onClose, onOk }: ConfirmTelegramUnlinkModalProps) => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t(Profile.TELEGRAM_VERIFIED_MODAL_TITLE)}
			buttonPrimaryText={t(Profile.TELEGRAM_VERIFIED_MODAL_YES)}
			buttonOutlineText={t(Profile.TELEGRAM_VERIFIED_MODAL_NO)}
			buttonPrimaryClick={onOk}
			buttonOutlineClick={onClose}
		>
			{t(Profile.TELEGRAM_VERIFIED_MODAL_DESCRIPTION)}
		</Modal>
	);
};

export default ConfirmTelegramUnlinkModal;
