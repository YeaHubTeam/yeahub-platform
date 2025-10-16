import moderationModal from '@/shared/assets/images/emailModal.avif';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import styles from './NotificationModal.module.css';

interface NotificationModalProps {
	isOpen: boolean;
	onClose: () => void;
	notificationTitle: string;
	notificationMessage: string;
}

export const NotificationModal = ({
	isOpen,
	onClose,
	notificationTitle,
	notificationMessage,
}: NotificationModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			view="notification"
			className={styles['moderation-content']}
		>
			<Flex justify="center" align="center" direction="column" className={styles.modal}>
				<img src={moderationModal} alt="email icon" loading="lazy" />
				<Text variant="body6" className={styles['modal-title']}>
					{notificationTitle}
				</Text>

				<Text variant="body3-accent" className={styles['modal-subtitle']}>
					{notificationMessage}
				</Text>
			</Flex>
		</Modal>
	);
};
