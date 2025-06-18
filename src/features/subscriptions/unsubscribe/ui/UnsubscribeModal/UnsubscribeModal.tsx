import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Modal, ModalProps } from '@/shared/ui/Modal';
import { TextHtml } from '@/shared/ui/TextHtml';

import { getFullProfile } from '@/entities/profile';

import { useUnsubscribeMutation } from '../../api/unsubscribeApi';

import styles from './UnsubscribeModal.module.css';

type UnsubscribeModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

export const UnsubscribeModal = ({ isOpen, onClose }: UnsubscribeModalProps) => {
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
