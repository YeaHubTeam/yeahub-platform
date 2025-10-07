import { useTranslation } from 'react-i18next';

import moderationModal from '@/shared/assets/images/emailModal.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import styles from './ResourceEditedModerationModal.module.css';

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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className={styles['moderation-content']}
			view="notification"
		>
			<Flex justify="center" align="center" direction="column" className={styles.modal}>
				<img src={moderationModal} alt="email icon" loading="lazy" />
				<Text variant="body6" className={styles['modal-title']}>
					{t(Resources.MODAL_RESOURCE_EDIT_MODERATION_TITLE)}
				</Text>

				<Text variant="body3-accent" className={styles['modal-subtitle']}>
					{t(Resources.MODAL_RESOURCE_EDIT_MODERATION_MESSAGE)}
				</Text>
			</Flex>
		</Modal>
	);
};
