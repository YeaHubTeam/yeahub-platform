import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Subscription } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Modal, RequiredModalProps } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';

import { useUnsubscribeMutation } from '../../api/unsubscribeApi';

import styles from './UnsubscribeModal.module.css';

export const UnsubscribeModal = ({ isOpen, onClose }: RequiredModalProps) => {
	const { t } = useTranslation([i18Namespace.subscription]);

	const profile = useAppSelector(getFullProfile);

	const subscriptionId = useMemo(() => {
		const sorted = [...profile.subscriptions].sort(
			(a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
		);

		return sorted[0].subscriptionId;
	}, [profile]);

	const [unsubscribe] = useUnsubscribeMutation();

	const handleClose = () => {
		onClose();
	};

	const handleUnsubscribe = () => {
		unsubscribe({
			subscriptionId: subscriptionId,
			userId: profile?.id,
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
			className={styles.modal}
		>
			<Text variant="body3" className={styles.description}>
				{t(Subscription.UNSUBSCRIBE_MODAL_DESCRIPTION)}
			</Text>
		</Modal>
	);
};
