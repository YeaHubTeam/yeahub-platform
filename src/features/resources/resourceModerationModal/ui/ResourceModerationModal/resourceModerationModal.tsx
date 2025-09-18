import { useTranslation } from 'react-i18next';

import moderationModal from '@/shared/assets/images/emailModal.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import { CreateResourceRequestResponse } from '@/features/resources/createResourceRequest/model/types/resourceRequestCreateTypes';

import styles from './ResourceModerationModal.module.css';

interface ResourceModerationModalProps {
	isOpen: boolean;
	resourceData: CreateResourceRequestResponse | null;
	onClose: () => void;
}

export const ResourceModerationModal = ({
	isOpen,
	resourceData,
	onClose,
}: ResourceModerationModalProps) => {
	const { t } = useTranslation([i18Namespace.translation]);
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			withCloseIcon={true}
			className={styles['moderation-content']}
		>
			<Flex justify="center" align="center" direction="column" className={styles['modal']}>
				<img
					src={moderationModal}
					alt="email icon"
					loading="lazy"
					className={styles['modal-image']}
				/>
				<Text variant="body3" className={styles['modal-title']}>
					{t(Translation.MODAL_RESOURCE_MODERATION_TITLE, { ns: i18Namespace.translation })}
				</Text>

				<Text variant="body2" className={styles['modal-subtitle']}>
					{t(Translation.MODAL_RESOURCE_MODERATION_MESSAGE, {
						resourceName: resourceData?.name,
					})}
				</Text>
			</Flex>
		</Modal>
	);
};
