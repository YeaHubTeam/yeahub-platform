import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Subscription } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Modal, RequiredModalProps } from '@/shared/ui/Modal';
import { TextHtml } from '@/shared/ui/TextHtml';

import { getFullProfile } from '@/entities/profile';

import { useUnsubscribeMutation } from '../../api/unsubscribeApi';

import styles from './UnsubscribeModal.module.css';

export const UnsubscribeModal = ({ isOpen, onClose }: RequiredModalProps) => {
	const { t } = useTranslation([i18Namespace.subscription]);

	const profileInfo = useAppSelector(getFullProfile);

	const subscriptionId = useMemo(() => {
		const sorted = [...profileInfo.subscriptions].sort(
			(a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
		);

		return sorted[0].subscriptionId;
	}, [profileInfo]);

	const [unsubscribe] = useUnsubscribeMutation();

	const handleClose = () => {
		onClose();
	};

	const handleUnsubscribe = () => {
		unsubscribe({
			subscriptionId: subscriptionId,
			userId: profileInfo?.id,
		});
		onClose();
	};

	return (
		<Modal
			title={t(Subscription.UNSUBSCRIBE_MODAL_TITLE)}
			variant="error"
			buttonPrimaryText={t(Subscription.UNSUBSCRIBE_MODAL_BUTTON_YES)}
			buttonOutlineText={t(Subscription.UNSUBSCRIBE_MODAL_BUTTON_NO)}
			buttonOutlineClick={handleClose}
			buttonPrimaryClick={handleUnsubscribe}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<TextHtml
				html={t(Subscription.UNSUBSCRIBE_MODAL_DESCRIPTION)}
				className={styles.description}
			/>
		</Modal>
	);
};
