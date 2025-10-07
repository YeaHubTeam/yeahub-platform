import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { NotificationModal } from '@/shared/ui/NotificationModal';

interface ResourceEditedModerationModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const ResourceEditedModerationModal = ({
	isOpen,
	onClose,
}: ResourceEditedModerationModalProps) => {
	const { t } = useTranslation([i18Namespace.resources]);

	return (
		<NotificationModal
			isOpen={isOpen}
			onClose={onClose}
			notificationTitle={t(Resources.MODAL_RESOURCE_EDIT_MODERATION_TITLE)}
			notificationMessage={t(Resources.MODAL_RESOURCE_EDIT_MODERATION_MESSAGE)}
		/>
	);
};
